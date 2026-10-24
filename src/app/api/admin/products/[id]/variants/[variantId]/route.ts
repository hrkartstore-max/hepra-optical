import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
const schema=z.object({stock:z.number().int().min(0).max(100000).optional(),priceDelta:z.number().min(-100000).max(100000).optional(),active:z.boolean().optional()});
export async function PATCH(request:Request,{params}:{params:Promise<{id:string;variantId:string}>}){const s=await getAdminSession();if(!s||s.user.role!=="ADMIN")return NextResponse.json({ok:false,error:"Administrator access required."},{status:403});const {id,variantId}=await params;const p=schema.safeParse(await request.json());if(!p.success||!Object.keys(p.data||{}).length)return NextResponse.json({ok:false,error:"Invalid variant update."},{status:400});const r=await prisma.productVariant.updateMany({where:{id:variantId,productId:id},data:p.data});if(!r.count)return NextResponse.json({ok:false,error:"Variant not found."},{status:404});return NextResponse.json({ok:true})}
