"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
export function StoreHydration(){const setHydrated=useCartStore(s=>s.setHydrated);useEffect(()=>{void useCartStore.persist.rehydrate().finally(()=>setHydrated(true))},[setHydrated]);return null}
