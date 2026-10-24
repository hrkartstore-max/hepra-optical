import type { Metadata } from "next";
import { ProductListing } from "@/components/product-listing";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Shop Eyewear", description: "Shop original OptiKart eyeglasses, sunglasses, screen glasses and more." };
export default async function ShopPage({searchParams}:{searchParams:Promise<Record<string,string|string[]|undefined>>}) { return <ProductListing searchParams={searchParams}/>; }
