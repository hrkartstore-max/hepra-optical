import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import Razorpay from "razorpay";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export const runtime = "nodejs";
const schema = z.object({
  email: z.string().email().max(254), phone: z.string().min(8).max(20),
  paymentMethod: z.enum(["RAZORPAY","COD"]),
  address: z.object({ fullName:z.string().min(2).max(120), line1:z.string().min(4).max(240), line2:z.string().max(240).optional(), city:z.string().min(2).max(100), state:z.string().min(2).max(100), postalCode:z.string().regex(/^[1-9][0-9]{5}$/), country:z.string().default("India") }),
  items: z.array(z.object({ productId:z.string().min(1), variantId:z.string().optional(), quantity:z.number().int().min(1).max(10), lensOptionId:z.string().optional(), prescription:z.record(z.string(),z.unknown()).optional() })).min(1).max(30),
  couponCode:z.string().max(40).optional()
});
export async function POST(request:Request){
 try {
  const parsed=schema.safeParse(await request.json());
  if(!parsed.success)return NextResponse.json({error:"Check your checkout details.",issues:parsed.error.flatten()},{status:400});
  const input=parsed.data;const session=await auth();
  const ids=[...new Set(input.items.map(i=>i.productId))];
  const products=await prisma.product.findMany({where:{id:{in:ids},status:"ACTIVE"},include:{variants:{where:{active:true}},category:true}});
  if(products.length!==ids.length)return NextResponse.json({error:"One or more products are unavailable."},{status:409});
  let subtotal=0;
  const orderItems=[];
  for(const item of input.items){
   const product=products.find(p=>p.id===item.productId);
   if(!product)return NextResponse.json({error:"Product unavailable."},{status:409});
   const variant=item.variantId?product.variants.find(v=>v.id===item.variantId):undefined;
   if(item.variantId&&!variant)return NextResponse.json({error:"Selected variant is unavailable."},{status:409});
   if(variant&&variant.stock<item.quantity)return NextResponse.json({error:"Insufficient stock for "+product.name+"."},{status:409});
   let lensPrice=0;let lensSnapshot:Record<string,unknown>|undefined;
   if(item.lensOptionId){
    const lens=await prisma.lensOption.findFirst({where:{id:item.lensOptionId,active:true}});
    if(!lens)return NextResponse.json({error:"Selected lens option is unavailable."},{status:409});
    lensPrice=Number(lens.price);lensSnapshot={id:lens.id,name:lens.name,category:lens.category,price:lensPrice};
    if(item.prescription)lensSnapshot.prescription=item.prescription;
   }
   const unitPrice=Number(product.basePrice)+(Number(variant?.priceDelta)||0)+lensPrice;
   subtotal+=unitPrice*item.quantity;
   const imgs=Array.isArray(product.images)?product.images as Array<{url?:string}>:[];
   orderItems.push({productId:product.id,variantId:variant?.id,productName:product.name,sku:variant?.sku||product.sku||undefined,imageUrl:imgs[0]?.url,quantity:item.quantity,unitPrice,lineTotal:unitPrice*item.quantity,lensSnapshot:lensSnapshot as any});
  }
  let discount=0;let couponId:string|undefined;
  if(input.couponCode){
   const coupon=await prisma.coupon.findFirst({where:{code:input.couponCode.toUpperCase().trim(),active:true,AND:[{OR:[{startsAt:null},{startsAt:{lte:new Date()}}]},{OR:[{expiresAt:null},{expiresAt:{gte:new Date()}}]},{OR:[{usageLimit:null},{usageCount:{lt:prisma.coupon.fields.usageLimit as any}}]}]}});
   if(!coupon)return NextResponse.json({error:"That coupon is not valid right now."},{status:400});
   if(subtotal<Number(coupon.minOrderValue))return NextResponse.json({error:"Your subtotal does not meet this coupon's minimum."},{status:400});
   discount=coupon.discountType==="PERCENTAGE"?subtotal*Number(coupon.discountValue)/100:Number(coupon.discountValue);
   if(coupon.maxDiscount!==null)discount=Math.min(discount,Number(coupon.maxDiscount));
   discount=Math.min(subtotal,Math.round(discount*100)/100);couponId=coupon.id;
  }
  const shipping=subtotal-discount>=999?0:79;const grandTotal=Math.round((subtotal-discount+shipping)*100)/100;
  if(input.paymentMethod==="RAZORPAY"&&(!process.env.RAZORPAY_KEY_ID||!process.env.RAZORPAY_KEY_SECRET))return NextResponse.json({error:"Online payment is not configured. Use COD in this preview or configure Razorpay test keys."},{status:503});
  const orderNumber="OK"+Date.now().toString().slice(-8)+randomBytes(2).toString("hex").toUpperCase();
  let razorpayOrderId:string|undefined;
  if(input.paymentMethod==="RAZORPAY"){
   const razorpay=new Razorpay({key_id:process.env.RAZORPAY_KEY_ID!,key_secret:process.env.RAZORPAY_KEY_SECRET!});
   const rp=await razorpay.orders.create({amount:Math.round(grandTotal*100),currency:"INR",receipt:orderNumber,notes:{orderNumber}});
   razorpayOrderId=rp.id;
  }
  const order=await prisma.order.create({data:{orderNumber,userId:session?.user?.id,email:input.email.toLowerCase().trim(),phone:input.phone,status:"PENDING",paymentStatus:"PENDING",paymentMethod:input.paymentMethod,razorpayOrderId,subtotal,discountTotal:discount,shippingTotal:shipping,grandTotal,couponId,shippingAddress:input.address as any,items:{create:orderItems as any}}});
  if(couponId)await prisma.coupon.update({where:{id:couponId},data:{usageCount:{increment:1}}});
  return NextResponse.json({orderId:order.id,orderNumber:order.orderNumber,amount:Math.round(grandTotal*100),currency:"INR",razorpayOrderId,keyId:input.paymentMethod==="RAZORPAY"?process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID:null,paymentMethod:input.paymentMethod},{status:201});
 }catch(error){console.error("Order creation failed",error instanceof Error?error.message:"unknown");return NextResponse.json({error:"We could not create this order. Please review your details and try again."},{status:500});}
}
