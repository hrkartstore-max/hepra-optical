import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
export const dynamic="force-dynamic";
export async function GET(){const session=await getAdminSession();if(!session)return NextResponse.json({ok:false,error:"Admin access required."},{status:403});const rows=await prisma.prescription.findMany({select:{id:true,name:true,type:true,status:true,odSph:true,odCyl:true,odAxis:true,odPd:true,osSph:true,osCyl:true,osAxis:true,osPd:true,addPower:true,uploadUrl:true,notes:true,createdAt:true,user:{select:{id:true,name:true,email:true}}},orderBy:{createdAt:"desc"},take:100});return NextResponse.json({ok:true,prescriptions:rows})}
