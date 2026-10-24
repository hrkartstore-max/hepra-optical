import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SignInForm } from "@/components/sign-in-form";
export const metadata: Metadata = { title: "Sign in", description: "Sign in to your OptiKart account." };
export default function SignInPage() { return <><SiteHeader/><main className="grid min-h-[70vh] place-items-center bg-opti-canvas px-4 py-12"><Suspense fallback={<div className="h-96 w-full max-w-md animate-pulse rounded-3xl bg-white"/>}><SignInForm/></Suspense></main><SiteFooter/></>; }
