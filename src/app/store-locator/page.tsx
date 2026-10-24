import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StoreLocator } from "@/components/store-locator";
export const dynamic="force-dynamic";
export const metadata:Metadata={title:"Store Locator",description:"Find verified OptiKart store locations and check services."};
export default async function StoreLocatorPage(){let stores:any[]=[];try{stores=await prisma.store.findMany({where:{active:true},orderBy:[{city:"asc"},{name:"asc"}]})}catch{}const data=stores.map(s=>({...s,latitude:s.latitude==null?null:String(s.latitude),longitude:s.longitude==null?null:String(s.longitude)}));return <><SiteHeader/><main className="container-shell py-10 sm:py-14"><p className="eyebrow mb-3">COME SAY HELLO</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy sm:text-5xl">Find your nearest store.</h1><p className="mb-8 mt-3 max-w-2xl text-sm leading-7 text-slate-500">Search by city or PIN code. We publish only verified locations; opening hours and appointment availability should be confirmed before visiting.</p><StoreLocator stores={data}/></main><SiteFooter/></>}
