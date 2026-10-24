"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
export function StoreHydration(){const setHydrated=useCartStore(s=>s.setHydrated);const setWishlist=useCartStore(s=>s.setWishlist);useEffect(()=>{void (async()=>{try{await useCartStore.persist.rehydrate();const r=await fetch("/api/wishlist");if(r.ok){const d=await r.json();if(d.ok&&Array.isArray(d.productIds))setWishlist(d.productIds)}}catch{}finally{setHydrated(true)}})()},[setHydrated,setWishlist]);return null}
