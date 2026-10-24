import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export async function GET(){const s=await auth();if(!s?.user?.id||!["ADMIN","STAFF"].includes(s.user.role))return NextResponse.json({error:"Forbidden"},{status:403});try{return NextResponse.json({categories:await prisma.category.findMany({where:{active:true},select:{id:true,name:true,slug:true},orderBy:{sortOrder:"asc"}})})}catch{return NextResponse.json({error:"Categories unavailable"},{status:503})}}
