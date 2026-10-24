"use client";
import { ProductCard, type ProductCardData } from "@/components/product-card";
export function HomeFeatured({products}:{products:ProductCardData[]}){return <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{products.map(product=><ProductCard key={product.id} product={product}/>)}</div>}
