
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from "lucide-react";

export function ProviderDashboard() {
    const { toast } = useToast();

    const handleProductListing = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Listing Fee Payment",
            description: "Please confirm the transaction in your wallet to list the product.",
        });
        
        setTimeout(() => {
            toast({
                title: "Product Listed!",
                description: "Your new product is now available in the DeFarm marketplace.",
            });
        }, 3000);
    };

    return (
        <Card className="bg-card/50 border-border/50 shadow-lg">
            <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-accent">Provider Dashboard</CardTitle>
                <CardDescription>List new products on the marketplace.</CardDescription>
            </CardHeader>
            <form onSubmit={handleProductListing}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="productName">Product Name</Label>
                        <Input id="productName" placeholder="e.g., Golden Maize" required className="bg-background" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="aboutProduct">About Product</Label>
                        <Textarea id="aboutProduct" placeholder="A short description of the product." required className="bg-background" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="productContent">Product Content/URL</Label>
                        <Textarea id="productContent" placeholder="Detailed content or a link to more information." required className="bg-background" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="productQuantity">Quantity</Label>
                            <Input id="productQuantity" type="number" placeholder="e.g., 500" required className="bg-background" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="productWholePrice">Wholesale Price (ETH)</Label>
                            <Input id="productWholePrice" type="number" step="0.01" placeholder="e.g., 100" required className="bg-background" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="productSinglePrice">Single Item Price (ETH)</Label>
                        <Input id="productSinglePrice" type="number" step="0.01" placeholder="e.g., 0.25" required className="bg-background" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                       <PlusCircle className="mr-2" /> Pay Fee & List Product
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
