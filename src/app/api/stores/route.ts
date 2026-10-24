import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const revalidate=300;
export async function GET(){try{const stores=await prisma.store.findMany({where:{active:true},select:{id:true,name:true,city:true,state:true,address:true,postalCode:true,phone:true,services:true,latitude:true,longitude:true},orderBy:[{city:"asc"},{name:"asc"}]});return NextResponse.json({stores})}catch{return NextResponse.json({stores:[]})}}
