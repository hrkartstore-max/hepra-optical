import { PrismaClient, FrameColor, FrameMaterial, FrameShape, Gender, LensCategory, LensFeature, ProductStatus, DiscountType, AppointmentType } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Eyeglasses", slug: "eyeglasses", description: "Everyday prescription frames, made personal.", sortOrder: 1 },
  { name: "Sunglasses", slug: "sunglasses", description: "Sun-ready shapes for every point of view.", sortOrder: 2 },
  { name: "Screen Glasses", slug: "screen-glasses", description: "Comfort-minded frames for screen-heavy days.", sortOrder: 3 },
  { name: "Contact Lenses", slug: "contact-lenses", description: "Contact lens options to discuss with your eye-care professional.", sortOrder: 4 },
  { name: "Kids", slug: "kids", description: "Comfortable, playful frames for younger faces.", sortOrder: 5 },
  { name: "Progressive Glasses", slug: "progressive-glasses", description: "Frame options for progressive lens wearers.", sortOrder: 6 },
  { name: "Accessories", slug: "accessories", description: "Cases, care and everyday eyewear essentials.", sortOrder: 7 },
  { name: "Computer Readers", slug: "computer-readers", description: "Screen-friendly styles and reading frames.", sortOrder: 8 },
];

const brands = [
  { name: "OptiKart Studio", slug: "optikart-studio", description: "Original OptiKart house collection." },
  { name: "Northline", slug: "northline", description: "Clean everyday silhouettes." },
  { name: "Forma", slug: "forma", description: "Contemporary shapes and considered details." },
  { name: "Dayform", slug: "dayform", description: "Relaxed frames for everyday routines." },
  { name: "Little Look", slug: "little-look", description: "Colourful, kid-friendly frame styles." },
];

type SeedProduct = { name: string; category: string; brand: string; price: number; shape?: FrameShape; material?: FrameMaterial; color?: FrameColor; gender?: Gender; size?: string; bestseller?: boolean; isNew?: boolean; tags?: string[] };
const raw: SeedProduct[] = [
  {name:"Aster Round",category:"eyeglasses",brand:"optikart-studio",price:1499,shape:FrameShape.ROUND,material:FrameMaterial.ACETATE,color:FrameColor.BLACK,gender:Gender.UNISEX,bestseller:true},
  {name:"Marlow Square",category:"eyeglasses",brand:"northline",price:1799,shape:FrameShape.SQUARE,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.GOLD,gender:Gender.MEN,bestseller:true},
  {name:"Iris Cat-Eye",category:"eyeglasses",brand:"forma",price:1899,shape:FrameShape.CAT_EYE,material:FrameMaterial.ACETATE,color:FrameColor.TORTOISE,gender:Gender.WOMEN,isNew:true},
  {name:"Atlas Rectangle",category:"eyeglasses",brand:"northline",price:1299,shape:FrameShape.RECTANGLE,material:FrameMaterial.TR90_STEEL,color:FrameColor.BLUE,gender:Gender.MEN},
  {name:"Sora Transparent",category:"eyeglasses",brand:"dayform",price:1599,shape:FrameShape.ROUND,material:FrameMaterial.ACETATE,color:FrameColor.TRANSPARENT,gender:Gender.UNISEX,bestseller:true},
  {name:"Mira Oval",category:"eyeglasses",brand:"forma",price:1699,shape:FrameShape.OVAL,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.GOLD,gender:Gender.WOMEN},
  {name:"Cove Wayfarer",category:"eyeglasses",brand:"dayform",price:1399,shape:FrameShape.WAYFARER,material:FrameMaterial.ACETATE,color:FrameColor.TORTOISE,gender:Gender.UNISEX},
  {name:"Nova Geometric",category:"eyeglasses",brand:"optikart-studio",price:2199,shape:FrameShape.GEOMETRIC,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.SILVER,gender:Gender.UNISEX,isNew:true},
  {name:"Elio Lightweight",category:"eyeglasses",brand:"northline",price:1999,shape:FrameShape.RECTANGLE,material:FrameMaterial.TR90_STEEL,color:FrameColor.BLACK,gender:Gender.MEN},
  {name:"Pippa Soft Square",category:"eyeglasses",brand:"forma",price:1799,shape:FrameShape.SQUARE,material:FrameMaterial.ACETATE,color:FrameColor.PINK,gender:Gender.WOMEN,bestseller:true},
  {name:"Aero Aviator",category:"sunglasses",brand:"northline",price:2299,shape:FrameShape.AVIATOR,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.GOLD,gender:Gender.UNISEX,bestseller:true},
  {name:"Sol Cat-Eye Sun",category:"sunglasses",brand:"forma",price:1999,shape:FrameShape.CAT_EYE,material:FrameMaterial.ACETATE,color:FrameColor.BLACK,gender:Gender.WOMEN},
  {name:"Drift Wayfarer Sun",category:"sunglasses",brand:"dayform",price:1599,shape:FrameShape.WAYFARER,material:FrameMaterial.ACETATE,color:FrameColor.TORTOISE,gender:Gender.UNISEX,bestseller:true},
  {name:"Coastline Square",category:"sunglasses",brand:"northline",price:1899,shape:FrameShape.SQUARE,material:FrameMaterial.TR90_STEEL,color:FrameColor.BLUE,gender:Gender.MEN,isNew:true},
  {name:"Halo Round Sun",category:"sunglasses",brand:"optikart-studio",price:2099,shape:FrameShape.ROUND,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.SILVER,gender:Gender.UNISEX},
  {name:"Dune Oversized",category:"sunglasses",brand:"forma",price:2499,shape:FrameShape.CAT_EYE,material:FrameMaterial.ACETATE,color:FrameColor.BROWN,gender:Gender.WOMEN},
  {name:"Orbit Polar",category:"sunglasses",brand:"northline",price:2799,shape:FrameShape.AVIATOR,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.BLACK,gender:Gender.MEN},
  {name:"Tide Transparent Sun",category:"sunglasses",brand:"dayform",price:1699,shape:FrameShape.SQUARE,material:FrameMaterial.ACETATE,color:FrameColor.TRANSPARENT,gender:Gender.UNISEX},
  {name:"Focus One",category:"screen-glasses",brand:"optikart-studio",price:1199,shape:FrameShape.RECTANGLE,material:FrameMaterial.TR90_STEEL,color:FrameColor.BLACK,gender:Gender.UNISEX,bestseller:true},
  {name:"Focus Round",category:"screen-glasses",brand:"dayform",price:1399,shape:FrameShape.ROUND,material:FrameMaterial.ACETATE,color:FrameColor.TORTOISE,gender:Gender.UNISEX},
  {name:"Focus Metal",category:"screen-glasses",brand:"northline",price:1799,shape:FrameShape.SQUARE,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.GOLD,gender:Gender.MEN},
  {name:"Focus Blush",category:"screen-glasses",brand:"forma",price:1499,shape:FrameShape.CAT_EYE,material:FrameMaterial.ACETATE,color:FrameColor.PINK,gender:Gender.WOMEN,isNew:true},
  {name:"Focus Clear",category:"screen-glasses",brand:"optikart-studio",price:1299,shape:FrameShape.ROUND,material:FrameMaterial.ACETATE,color:FrameColor.TRANSPARENT,gender:Gender.UNISEX},
  {name:"Focus Pro",category:"screen-glasses",brand:"northline",price:1999,shape:FrameShape.RECTANGLE,material:FrameMaterial.TR90_STEEL,color:FrameColor.BLUE,gender:Gender.MEN,bestseller:true},
  {name:"Little Comet",category:"kids",brand:"little-look",price:899,shape:FrameShape.ROUND,material:FrameMaterial.TR90_STEEL,color:FrameColor.BLUE,gender:Gender.KIDS,bestseller:true},
  {name:"Little Bloom",category:"kids",brand:"little-look",price:999,shape:FrameShape.CAT_EYE,material:FrameMaterial.TR90_STEEL,color:FrameColor.PINK,gender:Gender.KIDS},
  {name:"Little Explorer",category:"kids",brand:"little-look",price:1099,shape:FrameShape.RECTANGLE,material:FrameMaterial.TR90_STEEL,color:FrameColor.GREEN,gender:Gender.KIDS,isNew:true},
  {name:"Little Orbit",category:"kids",brand:"little-look",price:949,shape:FrameShape.ROUND,material:FrameMaterial.TR90_STEEL,color:FrameColor.TRANSPARENT,gender:Gender.KIDS},
  {name:"Little Racer",category:"kids",brand:"little-look",price:1199,shape:FrameShape.WAYFARER,material:FrameMaterial.TR90_STEEL,color:FrameColor.BLACK,gender:Gender.KIDS},
  {name:"Little Star",category:"kids",brand:"little-look",price:999,shape:FrameShape.OVAL,material:FrameMaterial.TR90_STEEL,color:FrameColor.PINK,gender:Gender.KIDS},
  {name:"Vista Progressive",category:"progressive-glasses",brand:"northline",price:2499,shape:FrameShape.RECTANGLE,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.GOLD,gender:Gender.UNISEX},
  {name:"Vista Classic",category:"progressive-glasses",brand:"optikart-studio",price:2199,shape:FrameShape.SQUARE,material:FrameMaterial.ACETATE,color:FrameColor.BLACK,gender:Gender.UNISEX,bestseller:true},
  {name:"Vista Air",category:"progressive-glasses",brand:"dayform",price:2799,shape:FrameShape.RIMLESS,material:FrameMaterial.METAL_TITANIUM,color:FrameColor.SILVER,gender:Gender.UNISEX},
  {name:"Vista Ease",category:"progressive-glasses",brand:"forma",price:2399,shape:FrameShape.OVAL,material:FrameMaterial.ACETATE,color:FrameColor.TORTOISE,gender:Gender.WOMEN},
  {name:"Daily Contact Lens",category:"contact-lenses",brand:"optikart-studio",price:899,gender:Gender.UNISEX,tags:["contact","daily"]},
  {name:"Monthly Contact Lens",category:"contact-lenses",brand:"optikart-studio",price:699,gender:Gender.UNISEX,tags:["contact","monthly"]},
  {name:"Toric Contact Lens",category:"contact-lenses",brand:"optikart-studio",price:1299,gender:Gender.UNISEX,tags:["contact","toric"]},
  {name:"Colour Contact Lens",category:"contact-lenses",brand:"optikart-studio",price:599,gender:Gender.UNISEX,tags:["contact","colour"]},
  {name:"Everyday Lens Care Kit",category:"accessories",brand:"optikart-studio",price:299,gender:Gender.UNISEX,tags:["accessory","care"]},
  {name:"Protective Frame Case",category:"accessories",brand:"optikart-studio",price:199,gender:Gender.UNISEX,tags:["accessory","case"]},
];

const images = {
  eyeglasses: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=85",
  sunglasses: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
  "screen-glasses": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85",
  kids: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=900&q=85",
  "progressive-glasses": "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=900&q=85",
  "contact-lenses": "https://images.unsplash.com/photo-1582142306909-195724d33ffc?auto=format&fit=crop&w=900&q=85",
  accessories: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
  "computer-readers": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=85",
};

async function main() {
  const categoryMap = new Map<string, string>();
  for (const category of categories) {
    const saved = await prisma.category.upsert({ where: { slug: category.slug }, update: { name: category.name, description: category.description, sortOrder: category.sortOrder, active: true }, create: category });
    categoryMap.set(category.slug, saved.id);
  }
  const brandMap = new Map<string, string>();
  for (const brand of brands) {
    const saved = await prisma.brand.upsert({ where: { slug: brand.slug }, update: { name: brand.name, description: brand.description, active: true }, create: brand });
    brandMap.set(brand.slug, saved.id);
  }
  for (const [index, p] of raw.entries()) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const imageUrl = images[p.category as keyof typeof images] ?? images.eyeglasses;
    await prisma.product.upsert({
      where: { slug },
      update: { name: p.name, basePrice: p.price, status: ProductStatus.ACTIVE, categoryId: categoryMap.get(p.category)!, brandId: brandMap.get(p.brand)!, gender: p.gender ?? Gender.UNISEX, shape: p.shape ?? null, material: p.material ?? null, color: p.color ?? null, size: p.size ?? "M", isBestseller: p.bestseller ?? false, isNewArrival: p.isNew ?? false, isFeatured: (p.bestseller ?? false) || index < 8, images: [{ url: imageUrl, alt: p.name + " eyewear" }], tags: p.tags ?? [p.category, p.shape?.toLowerCase() ?? "eyewear"] },
      create: { name: p.name, slug, sku: "OK-" + String(index + 1).padStart(4, "0"), description: p.name + " by OptiKart. An original sample catalogue item. Confirm fit, prescription suitability and final availability before purchase.", shortDescription: "Original OptiKart eyewear, designed for everyday comfort.", status: ProductStatus.ACTIVE, categoryId: categoryMap.get(p.category)!, brandId: brandMap.get(p.brand)!, basePrice: p.price, compareAtPrice: Math.round(p.price * 1.2), gender: p.gender ?? Gender.UNISEX, shape: p.shape ?? null, material: p.material ?? null, color: p.color ?? null, size: p.size ?? "M", isBestseller: p.bestseller ?? false, isNewArrival: p.isNew ?? false, isFeatured: (p.bestseller ?? false) || index < 8, prescriptionRequired: ["eyeglasses", "progressive-glasses"].includes(p.category), images: [{ url: imageUrl, alt: p.name + " eyewear" }], tags: p.tags ?? [p.category, p.shape?.toLowerCase() ?? "eyewear"], variants: { create: [{ sku: "OK-" + String(index + 1).padStart(4, "0") + "-M", name: "Medium", size: "M", color: p.color ?? null, colorLabel: p.color?.replaceAll("_", " ").toLowerCase() ?? "Default", stock: 12, priceDelta: 0, active: true }] } },
    });
  }
  const lensOptions = [
    { name: "Frame Only", slug: "frame-only", description: "Frame without prescription lenses.", category: LensCategory.FRAME_ONLY, price: 0, sortOrder: 1 },
    { name: "Single Vision Basic", slug: "single-vision-basic", description: "Single vision lenses. Prescription must be reviewed before fulfilment.", category: LensCategory.SINGLE_VISION, price: 499, sortOrder: 2 },
    { name: "Blue-Cut Lens", slug: "blue-cut", description: "Lens option marketed for digital comfort; not a medical treatment.", category: LensCategory.SINGLE_VISION, feature: LensFeature.BLUE_CUT, price: 899, sortOrder: 3 },
    { name: "Photochromic Lens", slug: "photochromic", description: "Light-responsive lens option; performance varies by product.", category: LensCategory.SINGLE_VISION, feature: LensFeature.PHOTOCHROMIC, price: 1299, sortOrder: 4 },
    { name: "Anti-Glare Lens", slug: "anti-glare", description: "Anti-reflective coating option.", category: LensCategory.SINGLE_VISION, feature: LensFeature.ANTI_GLARE, price: 799, sortOrder: 5 },
    { name: "Progressive Lens", slug: "progressive-lens", description: "Progressive lens option requiring prescription and fitting review.", category: LensCategory.PROGRESSIVE, price: 2499, sortOrder: 6 },
    { name: "Zero Power Lens", slug: "zero-power", description: "Non-prescription lens option.", category: LensCategory.ZERO_POWER, price: 299, sortOrder: 7 },
  ];
  for (const lens of lensOptions) await prisma.lensOption.upsert({ where: { slug: lens.slug }, update: { ...lens, active: true }, create: lens });
  await prisma.coupon.upsert({ where: { code: "WELCOME10" }, update: { active: true }, create: { code: "WELCOME10", description: "Demo welcome offer — 10% off eligible orders", discountType: DiscountType.PERCENTAGE, discountValue: 10, maxDiscount: 500, minOrderValue: 999, active: true } });
  await prisma.store.upsert({ where: { slug: "optikart-demo-store" }, update: { active: false }, create: { name: "OptiKart Demo Store (sample data)", slug: "optikart-demo-store", address: "Demo location — replace with a verified store address before launch", city: "Chennai", state: "Tamil Nadu", postalCode: "600001", services: ["Eye test booking", "Frame fitting"], active: false } });
  await prisma.appointment.createMany({ data: [], skipDuplicates: true });
  console.log(`Seed complete: ${raw.length} products, ${categories.length} categories, ${brands.length} brands, ${lensOptions.length} lens options.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => prisma.$disconnect());
