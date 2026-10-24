import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export const runtime="nodejs";
const schema=z.object({orderId:z.string().min(1),status:z.enum(["CONFIRMED","PROCESSING","SHIPPED","OUT_FOR_DELIVERY","DELIVERED","CANCELLED","RETURN_REQUESTED","RETURNED"])});
async function allowed(){const s=await auth();return !!s?.user?.id&&["ADMIN","STAFF"].includes(s.user.role)}
export async function GET(){if(!await allowed())return NextResponse.json({error:"Forbidden"},{status:403});try{const orders=await prisma.order.findMany({include:{items:true},orderBy:{createdAt:"desc"},take:250});return NextResponse.json({orders})}catch{return NextResponse.json({error:"Orders unavailable"},{status:503})}}
export async function PATCH(request:Request){if(!await allowed())return NextResponse.json({error:"Forbidden"},{status:403});const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:"Invalid order update."},{status:400});try{const order=await prisma.order.findUnique({where:{id:parsed.data.orderId}});if(!order)return NextResponse.json({error:"Order not found."},{status:404});if(parsed.data.status==="CANCELLED"&&order.paymentStatus==="PAID")return NextResponse.json({error:"Paid orders require the refund workflow before cancellation."},{status:409});const updated=await prisma.order.update({where:{id:order.id},data:{status:parsed.data.status}});return NextResponse.json({order:updated})}catch{return NextResponse.json({error:"Could not update order."},{status:500})}}
