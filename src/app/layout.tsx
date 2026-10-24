import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { StoreHydration } from "@/components/store-hydration";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins", display: "swap" });
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"), title: { default: "OptiKart — Eyewear, Your Way", template: "%s | OptiKart" }, description: "Discover original eyewear, sunglasses and screen glasses at OptiKart. Find a frame that fits your style, then choose your lens options with confidence.", applicationName: "OptiKart", openGraph: { type: "website", siteName: "OptiKart", title: "OptiKart — Eyewear, Your Way", description: "Find your next favourite frame." }, robots: { index: true, follow: true } };
export const viewport: Viewport = { themeColor: "#08083D", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en-IN"><body className={poppins.variable}><StoreHydration/>{children}</body></html>; }
