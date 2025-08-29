import { ProductCard } from "@/components/marketplace/product-card";
import { List, Wheat, Milk, Grape, Carrot, Beef } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const products = [
  { name: "Organic Corn", quantity: "500kg", price: "1.2 ETH/kg", delivery: "24h", verified: true, image: "https://picsum.photos/400/300?random=1", dataAiHint: "corn field" },
  { name: "Fresh Milk", quantity: "200L", price: "2.5 ETH/L", delivery: "48h", verified: true, image: "https://picsum.photos/400/300?random=2", dataAiHint: "milk bottle" },
  { name: "Free-Range Livestock", quantity: "50 head", price: "500 ETH/head", delivery: "On Request", verified: true, image: "https://picsum.photos/400/300?random=3", dataAiHint: "cattle pasture" },
  { name: "Heirloom Tomatoes", quantity: "150kg", price: "3.0 ETH/kg", delivery: "24h", verified: false, image: "https://picsum.photos/400/300?random=4", dataAiHint: "heirloom tomatoes" },
  { name: "Artisanal Cheese", quantity: "50kg", price: "15 ETH/kg", delivery: "72h", verified: true, image: "https://picsum.photos/400/300?random=5", dataAiHint: "artisanal cheese" },
  { name: "Winter Wheat", quantity: "1000kg", price: "0.8 ETH/kg", delivery: "On Request", verified: true, image: "https://picsum.photos/400/300?random=6", dataAiHint: "wheat field" },
];

const categories = [
    { name: "All Products", icon: List },
    { name: "Grains", icon: Wheat },
    { name: "Dairy", icon: Milk },
    { name: "Fruits", icon: Grape },
    { name: "Vegetables", icon: Carrot },
    { name: "Livestock", icon: Beef },
]

export default function MarketplacePage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Decentralized Marketplace</h1>
        <p className="mt-2 text-lg text-muted-foreground">Browse and trade resources directly from our community of verified farmers.</p>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
            <h2 className="text-xl font-semibold mb-4 text-accent">Categories</h2>
            <div className="flex flex-col gap-2">
                {categories.map((category, index) => (
                    <a key={index} href="#" className="flex items-center gap-3 p-2 rounded-md text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors">
                        <category.icon className="w-5 h-5" />
                        <span>{category.name}</span>
                    </a>
                ))}
            </div>
            <Separator className="my-6" />
            {/* Can add farmer dashboard link here */}
        </aside>
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
