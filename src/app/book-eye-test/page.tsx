import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AppointmentForm } from "@/components/appointment-form";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Book an Eye Test",description:"Request an OptiKart in-store or home eye-test appointment."};
export default async function BookEyeTestPage(){let stores: {id:string;name:string;city:string;state:string;address:string}[]=[];try{stores=await prisma.store.findMany({where:{active:true},select:{id:true,name:true,city:true,state:true,address:true},orderBy:{city:"asc"}})}catch{}return <><SiteHeader/><main className="container-shell py-10 sm:py-14"><p className="eyebrow mb-3">CARE THAT FITS YOUR DAY</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy sm:text-5xl">Book an eye test.</h1><p className="mb-8 mt-3 max-w-2xl text-sm leading-7 text-slate-500">Request an appointment at a listed store or ask about a home visit. We’ll confirm availability before your booking is final.</p><AppointmentForm stores={stores}/></main><SiteFooter/></>}
