import { requireAdminPage } from "@/lib/admin";
import { AdminPrescriptionsPanel } from "@/components/admin-panels";
export const dynamic="force-dynamic";
export const metadata={title:"Prescription Review"};
export default async function AdminSectionPage(){await requireAdminPage();return <AdminPrescriptionsPanel/>}
