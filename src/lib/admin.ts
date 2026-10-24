import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
export async function requireAdminPage(){const session=await auth();if(!session?.user?.id)redirect("/account/sign-in?callbackUrl=%2Fadmin");if(session.user.role!=="ADMIN"&&session.user.role!=="STAFF")redirect("/account");return session;}
export async function requireAdminApi(){const session=await auth();if(!session?.user?.id)return {ok:false as const,response:NextResponse.json({error:"Sign in required."},{status:401})};if(session.user.role!=="ADMIN"&&session.user.role!=="STAFF")return {ok:false as const,response:NextResponse.json({error:"Admin access required."},{status:403})};return {ok:true as const,session};}

export async function getAdminSession(){const session=await auth();if(!session?.user?.id||!(session.user.role==="ADMIN"||session.user.role==="STAFF"))return null;return session;}
