import { Suspense } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SignInForm } from "@/components/sign-in-form";
export default function SignInPage(){return <><SiteHeader/><main className="container-shell grid min-h-[70vh] place-items-center py-12"><div className="w-full max-w-md"><Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-opti-canvas"/>}><SignInForm googleEnabled={Boolean(process.env.AUTH_GOOGLE_ID&&process.env.AUTH_GOOGLE_SECRET)}/></Suspense><p className="mt-5 text-center text-[10px] text-slate-500">By continuing, you agree to our terms and privacy policy. <Link href="/" className="text-opti-teal">Learn more</Link></p></div></main><SiteFooter/></>}
