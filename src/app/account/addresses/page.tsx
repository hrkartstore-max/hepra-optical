import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AddressManager } from "@/components/address-manager";
export const dynamic="force-dynamic";
export default async function AddressesPage(){const session=await auth();if(!session?.user?.id)redirect("/account/sign-in?callbackUrl=/account/addresses");return <><SiteHeader/><main className="container-shell min-h-[60vh] py-10"><p className="eyebrow mb-3">DELIVERY DETAILS</p><h1 className="mb-7 text-3xl font-semibold tracking-[-.06em] text-opti-navy">Saved addresses</h1><AddressManager/></main><SiteFooter/></>}
