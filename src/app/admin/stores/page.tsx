import { requireAdminPage } from "@/lib/admin";
import { AdminStoresPanel } from "@/components/admin-panels";
export const dynamic="force-dynamic";
export const metadata={title:"Manage Stores"};
export default async function AdminSectionPage(){await requireAdminPage();return <AdminStoresPanel/>}
