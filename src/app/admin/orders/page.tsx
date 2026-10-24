import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrderManager } from "@/components/admin/order-manager";
export const dynamic="force-dynamic";
export default async function AdminOrders(){const s=await auth();if(!s?.user?.id)return redirect("/account/sign-in?callbackUrl=%2Fadmin%2Forders");if(!["ADMIN","STAFF"].includes(s.user.role))return redirect("/account");let orders:any[]=[];try{orders=await prisma.order.findMany({include:{items:true},orderBy:{createdAt:"desc"},take:200})}catch{}const safe=orders.map(o=>({id:o.id,orderNumber:o.orderNumber,email:o.email,phone:o.phone,status:o.status,paymentStatus:o.paymentStatus,paymentMethod:o.paymentMethod,total:Number(o.grandTotal),createdAt:o.createdAt.toISOString(),items:o.items.map((i:any)=>({name:i.productName,quantity:i.quantity,total:Number(i.lineTotal)}))}));return <><SiteHeader/><main className="container-shell min-h-[60vh] py-10"><Link href="/admin" className="text-xs font-semibold text-opti-teal">← Admin dashboard</Link><p className="eyebrow mb-3 mt-6">ORDER OPERATIONS</p><h1 className="text-3xl font-semibold tracking-[-.06em] text-opti-navy">Orders</h1><p className="mt-2 text-sm text-slate-500">Review payment status and update fulfilment progress.</p><div className="mt-7"><OrderManager initialOrders={safe}/></div></main><SiteFooter/></>}
