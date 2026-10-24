import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export const runtime="nodejs";
async function allowed(){const s=await auth();return !!s?.user?.id&&["ADMIN","STAFF"].includes(s.user.role)}
const schema=z.object({name:z.string().min(2).max(100),slug:z.string().min(2).max(120).regex(/^[a-z0-9-]+$/),description:z.string().min(5).max(1000),category:z.enum(["FRAME_ONLY","SINGLE_VISION","PROGRESSIVE","ZERO_POWER"]),feature:z.enum(["BLUE_CUT","PHOTOCHROMIC","ANTI_GLARE","UV_PROTECTION","POLARIZED"]).optional(),price:z.number().min(0).max(100000),sortOrder:z.number().int().min(0).max(1000)});
export async function GET(){if(!await allowed())return NextResponse.json({error:"Forbidden"},{status:403});try{return NextResponse.json({options:await prisma.lensOption.findMany({orderBy:[{sortOrder:"asc"},{name:"asc"}]})})}catch{return NextResponse.json({error:"Lens options unavailable"},{status:503})}}
export async function POST(req:Request){if(!await allowed())return NextResponse.json({error:"Forbidden"},{status:403});const p=schema.safeParse(await req.json());if(!p.success)return NextResponse.json({error:"Invalid lens option",issues:p.error.flatten()},{status:400});try{return NextResponse.json({option:await prisma.lensOption.create({data:p.data})},{status:201})}catch{return NextResponse.json({error:"Lens slug already exists or option could not be created."},{status:409})}}
