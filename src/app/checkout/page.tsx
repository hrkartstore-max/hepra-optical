import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CheckoutForm } from "@/components/checkout-form";
export const metadata={title:"Checkout",robots:{index:false,follow:false}};
export default function CheckoutPage(){return <><SiteHeader/><main className="container-shell py-8 sm:py-12"><div className="mb-8"><p className="eyebrow mb-3">ALMOST YOURS</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy sm:text-4xl">Checkout</h1><p className="mt-2 text-sm text-slate-500">Delivery details and payment choice.</p></div><CheckoutForm/></main><SiteFooter/></>}
