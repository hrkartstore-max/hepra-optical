import { requireAdminPage } from "@/lib/admin";
import { AdminCouponsPanel } from "@/components/admin-panels";
export const dynamic="force-dynamic";
export const metadata={title:"Manage Coupons"};
export default async function AdminSectionPage(){await requireAdminPage();return <AdminCouponsPanel/>}
