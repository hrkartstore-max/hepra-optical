import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VirtualTryOn } from "@/components/virtual-try-on";
export const metadata:Metadata={title:"Virtual Try-On",description:"Preview original OptiKart frame silhouettes with a browser camera."};
export default function VirtualTryOnPage(){return <><SiteHeader/><main className="container-shell min-h-[60vh] py-10 sm:py-14"><p className="eyebrow mb-3">THE FRAME PREVIEW</p><h1 className="text-4xl font-semibold tracking-[-.07em] text-opti-navy sm:text-5xl">Meet your <span className="font-normal italic text-opti-teal">next look.</span></h1><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">Try a few frame silhouettes with your camera. This is a visual preview only; fit, prescription suitability and final frame dimensions should be checked in person.</p><div className="mt-8"><VirtualTryOn/></div></main><SiteFooter/></>}
