import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){const s=await getAdminSession();if(!s||s.user.role!=="ADMIN")return NextResponse.json({ok:false,error:"Administrator access required."},{status:403});const {id}=await params;const p=z.object({active:z.boolean()}).safeParse(await request.json());if(!p.success)return NextResponse.json({ok:false,error:"Invalid coupon status."},{status:400});const r=await prisma.coupon.updateMany({where:{id},data:{active:p.data.active}});return r.count?NextResponse.json({ok:true}):NextResponse.json({ok:false,error:"Coupon not found."},{status:404})}
