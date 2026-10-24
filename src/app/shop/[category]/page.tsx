import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductListing } from "@/components/product-listing";
const allowed = new Set(["eyeglasses","sunglasses","screen-glasses","kids","contact-lenses","progressive-glasses","accessories","computer-readers"]);
export const dynamic = "force-dynamic";
export async function generateMetadata({params}:{params:Promise<{category:string}>}):Promise<Metadata>{const {category}=await params;return {title:category.replaceAll("-"," ").replace(/\b\w/g,c=>c.toUpperCase()),description:`Explore original OptiKart ${category.replaceAll("-"," ")} and compare frame and lens options.`}}
export default async function CategoryPage({params,searchParams}:{params:Promise<{category:string}>;searchParams:Promise<Record<string,string|string[]|undefined>>}) {const {category}=await params;if(!allowed.has(category))notFound();return <ProductListing category={category} searchParams={searchParams}/>;}
