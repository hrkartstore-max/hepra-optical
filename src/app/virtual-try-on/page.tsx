import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VirtualTryOn } from "@/components/virtual-try-on";
export const metadata:Metadata={title:"Virtual Try-On",description:"Preview original OptiKart frame shapes using an in-browser face landmark overlay."};
export default function VirtualTryOnPage(){return <><SiteHeader/><main className="container-shell py-10 sm:py-14"><p className="eyebrow mb-3">A NEW POINT OF VIEW</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy sm:text-5xl">See the style on you.</h1><p className="mb-8 mt-3 max-w-2xl text-sm leading-7 text-slate-500">Use your device camera to preview a frame outline aligned to facial landmarks. This is an approximate style preview, not a sizing or optical fitting tool.</p><VirtualTryOn/></main><SiteFooter/></>}
