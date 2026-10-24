import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WishlistClient } from "@/components/wishlist-client";
export const metadata={title:"My Wishlist"};
export default function WishlistPage(){return <><SiteHeader/><main className="container-shell min-h-[60vh] py-10"><p className="eyebrow mb-3">YOUR SAVED STYLES</p><h1 className="mb-7 text-3xl font-semibold tracking-[-.06em] text-opti-navy">My wishlist</h1><WishlistClient/></main><SiteFooter/></>}
