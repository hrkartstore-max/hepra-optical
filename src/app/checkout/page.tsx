import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckoutForm } from "@/components/checkout-form";
export const metadata:Metadata={title:"Secure Checkout",description:"Review delivery details and payment method for your OptiKart order."};
export default function CheckoutPage(){return <><SiteHeader/><main className="container-shell py-8 sm:py-12"><Link href="/cart" className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-opti-teal"><ArrowLeft size={14}/> Back to bag</Link><div className="mb-8"><p className="eyebrow mb-3">SAFE AND SIMPLE</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy sm:text-4xl">Checkout</h1><p className="mt-2 text-sm text-slate-500">Your order is confirmed only after the server validates it.</p></div><CheckoutForm/></main><SiteFooter/></>}
