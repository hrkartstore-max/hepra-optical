import { prisma } from "@/lib/prisma";
import type { ProductCardData } from "@/components/product-card";

const demoImages={frame:"https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=85",sun:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",screen:"https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85",kids:"https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=85"};
export const demoProducts: ProductCardData[] = [
{id:"demo-aster",name:"Aster Round",slug:"aster-round",basePrice:1499,compareAtPrice:1799,shortDescription:"A classic round silhouette for everyday wear.",gender:"UNISEX",shape:"ROUND",material:"ACETATE",color:"BLACK",images:[{url:demoImages.frame,alt:"Aster Round frames"}],isBestseller:true,brand:{name:"OptiKart Studio"}},
{id:"demo-marlow",name:"Marlow Square",slug:"marlow-square",basePrice:1799,compareAtPrice:2199,shortDescription:"Clean square lines with a considered metal finish.",gender:"MEN",shape:"SQUARE",material:"METAL_TITANIUM",color:"GOLD",images:[{url:demoImages.screen,alt:"Marlow Square frames"}],isNewArrival:true,brand:{name:"Northline"}},
{id:"demo-iris",name:"Iris Cat-Eye",slug:"iris-cat-eye",basePrice:1899,compareAtPrice:2299,shortDescription:"A gentle lift with a little extra character.",gender:"WOMEN",shape:"CAT_EYE",material:"ACETATE",color:"TORTOISE",images:[{url:demoImages.kids,alt:"Iris Cat-Eye frames"}],isBestseller:true,brand:{name:"Forma"}},
{id:"demo-aero",name:"Aero Aviator",slug:"aero-aviator",basePrice:2299,compareAtPrice:2799,shortDescription:"An iconic aviator shape for bright days.",gender:"UNISEX",shape:"AVIATOR",material:"METAL_TITANIUM",color:"GOLD",images:[{url:demoImages.sun,alt:"Aero Aviator sunglasses"}],isBestseller:true,brand:{name:"Northline"}},
{id:"demo-cove",name:"Cove Wayfarer",slug:"cove-wayfarer",basePrice:1399,compareAtPrice:1699,shortDescription:"An easy everyday wayfarer.",gender:"UNISEX",shape:"WAYFARER",material:"ACETATE",color:"TORTOISE",images:[{url:demoImages.frame,alt:"Cove Wayfarer"}],brand:{name:"Dayform"}},
{id:"demo-focus",name:"Focus One",slug:"focus-one",basePrice:1199,compareAtPrice:1499,shortDescription:"A simple screen-time style.",gender:"UNISEX",shape:"RECTANGLE",material:"TR90_STEEL",color:"BLACK",images:[{url:demoImages.screen,alt:"Focus One screen glasses"}],isBestseller:true,brand:{name:"OptiKart Studio"}},
{id:"demo-coastline",name:"Coastline Square",slug:"coastline-square",basePrice:1899,compareAtPrice:2299,shortDescription:"A modern square frame for sunny days.",gender:"MEN",shape:"SQUARE",material:"TR90_STEEL",color:"BLUE",images:[{url:demoImages.sun,alt:"Coastline Square sunglasses"}],isNewArrival:true,brand:{name:"Northline"}},
{id:"demo-little",name:"Little Comet",slug:"little-comet",basePrice:899,compareAtPrice:1099,shortDescription:"A colourful, lightweight frame for little faces.",gender:"KIDS",shape:"ROUND",material:"TR90_STEEL",color:"BLUE",images:[{url:demoImages.kids,alt:"Little Comet kids glasses"}],brand:{name:"Little Look"}},
];
export async function getProducts(options:{category?:string;q?:string;shape?:string;gender?:string;material?:string;color?:string;size?:string;brand?:string;min?:number;max?:number;sort?:string;take?:number;skip?:number}={}){
 try{
  const where:any={status:"ACTIVE"};
  if(options.category)where.category={slug:options.category};
  if(options.q)where.OR=[{name:{contains:options.q,mode:"insensitive"}},{description:{contains:options.q,mode:"insensitive"}},{tags:{has:options.q.toLowerCase()}}];
  if(options.shape)where.shape=options.shape.toUpperCase().replaceAll("-","_");
  if(options.gender)where.gender=options.gender.toUpperCase();
  if(options.material)where.material=options.material.toUpperCase();
  if(options.color)where.color=options.color.toUpperCase();
  if(options.size)where.size=options.size.toUpperCase();
  if(options.brand)where.brand={slug:options.brand};
  if(options.min!==undefined||options.max!==undefined)where.basePrice={...(options.min!==undefined?{gte:options.min}:{}),...(options.max!==undefined?{lte:options.max}:{})};
  const orderBy=options.sort==="price-low"?{basePrice:"asc" as const}:options.sort==="price-high"?{basePrice:"desc" as const}:options.sort==="newest"?{createdAt:"desc" as const}:options.sort==="name"?{name:"asc" as const}:{isBestseller:"desc" as const,createdAt:"desc" as const};
  return await prisma.product.findMany({where,include:{brand:{select:{name:true,slug:true}},category:{select:{name:true,slug:true}}},orderBy,take:options.take??48,skip:options.skip??0});
 }catch(error){console.error("Catalogue query unavailable; using demo catalogue.",error instanceof Error?error.message:"unknown");return demoProducts.filter(p=>(!options.category||options.category==="eyeglasses"&&p.slug==="aster-round"||options.category==="sunglasses"&&["aero-aviator","coastline-square"].includes(p.slug)||options.category==="screen-glasses"&&p.slug==="focus-one"||options.category==="kids"&&p.slug==="little-comet")&&(!options.q||p.name.toLowerCase().includes(options.q.toLowerCase())).slice(options.skip??0,(options.skip??0)+(options.take??48)))}
}
export async function getProductBySlug(slug:string){try{return await prisma.product.findFirst({where:{slug,status:"ACTIVE"},include:{brand:true,category:true,variants:{where:{active:true}},reviews:{where:{published:true},include:{user:{select:{name:true}}},orderBy:{createdAt:"desc"},take:8}}})}catch{return demoProducts.find(p=>p.slug===slug)??null}}
