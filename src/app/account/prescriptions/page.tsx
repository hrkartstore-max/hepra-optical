import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PrescriptionManager } from "@/components/prescription-manager";
export const dynamic="force-dynamic";
export default async function PrescriptionsPage(){const session=await auth();if(!session?.user?.id)redirect("/account/sign-in?callbackUrl=/account/prescriptions");return <><SiteHeader/><main className="container-shell min-h-[60vh] py-10"><p className="eyebrow mb-3">PRIVATE HEALTH DETAILS</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy">My prescriptions</h1><p className="mb-7 mt-2 max-w-xl text-sm leading-7 text-slate-500">Only save values from a current prescription. Your saved details are associated with your signed-in account.</p><PrescriptionManager/></main><SiteFooter/></>}
