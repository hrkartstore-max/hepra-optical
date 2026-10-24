import { auth } from "@/auth";
export async function getAdminSession(){const session=await auth();if(!session?.user?.id||!["ADMIN","STAFF"].includes(session.user.role))return null;return session}
export async function isAdminSession(){const session=await auth();return Boolean(session?.user?.id&&session.user.role==="ADMIN")}
