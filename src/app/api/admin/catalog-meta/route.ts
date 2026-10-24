import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
export const dynamic="force-dynamic";
export async function GET(){const s=await getAdminSession();if(!s)return NextResponse.json({ok:false,error:"Admin access required."},{status:403});const [categories,brands]=await Promise.all([prisma.category.findMany({where:{active:true},select:{id:true,name:true,slug:true},orderBy:{sortOrder:"asc"}}),prisma.brand.findMany({where:{active:true},select:{id:true,name:true,slug:true},orderBy:{name:"asc"}})]);return NextResponse.json({ok:true,categories,brands})}
