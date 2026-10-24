import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
const schema=z.object({id:z.string().min(1),status:z.enum(["CONFIRMED","COMPLETED","CANCELLED"])});
export async function PATCH(req:Request){const s=await auth();if(!s?.user?.id||!["ADMIN","STAFF"].includes(s.user.role))return NextResponse.json({error:"Forbidden"},{status:403});const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid appointment status."},{status:400});try{return NextResponse.json({appointment:await prisma.appointment.update({where:{id:p.data.id},data:{status:p.data.status}})})}catch{return NextResponse.json({error:"Appointment not found."},{status:404})}}
