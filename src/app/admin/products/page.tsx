import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductManager } from "@/components/admin/product-manager";
export const dynamic="force-dynamic";
export default async function AdminProducts(){const s=await auth();if(!s?.user?.id)return redirect("/account/sign-in?callbackUrl=%2Fadmin%2Fproducts");if(!["ADMIN","STAFF"].includes(s.user.role))return redirect("/account");return <><SiteHeader/><main className="container-shell min-h-[60vh] py-10"><Link href="/admin" className="text-xs font-semibold text-opti-teal">← Admin dashboard</Link><p className="eyebrow mb-3 mt-6">CATALOGUE CONTROL</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy">Products & variants</h1><p className="mt-2 text-sm text-slate-500">Create sample catalogue entries and archive products. Variant editing and private image upload need a configured storage provider.</p><div className="mt-7"><ProductManager/></div></main><SiteFooter/></>}
