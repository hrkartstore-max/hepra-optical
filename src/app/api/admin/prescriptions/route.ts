import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export const runtime="nodejs";
export async function GET(){const s=await auth();if(!s?.user?.id||s.user.role!=="ADMIN")return NextResponse.json({error:"Forbidden"},{status:403});try{const rows=await prisma.prescription.findMany({include:{user:{select:{name:true,email:true}}},orderBy:{updatedAt:"desc"},take:100});return NextResponse.json({prescriptions:rows})}catch{return NextResponse.json({error:"Prescription records unavailable"},{status:503})}}
