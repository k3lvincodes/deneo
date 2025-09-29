
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const products = [
  { name: "Organic Corn", price: 1.2, owner: "0xAb...c1d2", quantity: 500 },
  { name: "Artisanal Cheese", price: 15, owner: "0xCd...e3f4", quantity: 50 },
  { name: "Fresh Milk", price: 2.5, owner: "0xEf...g5h6", quantity: 200 },
];

const initialRequests = [
    { product: "Organic Corn", status: "Requested", destination: "123 Green St" },
];

const states = ["Abuja", "Lagos", "Kano", "Oyo", "Rivers", "Kaduna", "Sokoto"];

export function ConsumerDashboard() {
    const { toast } = useToast();
    const [requests, setRequests] = useState(initialRequests);
    const [selectedProduct, setSelectedProduct] = useState<(typeof products[0]) | null>(null);

    const handleRequestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProduct) return;
        
        // This would interact with the smart contract
        toast({
            title: "Product Requested",
            description: `${selectedProduct.name} has been requested. Check your orders for status.`,
        });

        setRequests(prev => [...prev, { product: selectedProduct.name, status: "Requested", destination: "N/A" }]);
        // Close dialog after submit. This requires managing dialog open state from here.
    };
    
    const handleCancelRequest = (index: number) => {
        // This would interact with FC_CancelRequest()
        toast({
            title: "Request Canceled",
            description: "Your product request has been canceled.",
        });
        setRequests(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-8">
            <Card className="bg-card/50 border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent">Request a Product</CardTitle>
                    <CardDescription>Select a product from the marketplace to request it.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Price (ETH/kg)</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">
                                         <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" onClick={() => setSelectedProduct(product)}>Request</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                                                <DialogHeader>
                                                    <DialogTitle>Request {selectedProduct?.name}</DialogTitle>
                                                    <DialogDescription>Fill in your details to request this product.</DialogDescription>
                                                </DialogHeader>
                                                <form onSubmit={handleRequestSubmit}>
                                                    <div className="grid gap-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="req-name">Your Name</Label>
                                                            <Input id="req-name" placeholder="Jane Doe" required className="bg-background"/>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="req-dest">Destination</Label>
                                                            <Input id="req-dest" placeholder="123 Green Street, Terra" required className="bg-background"/>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="req-contact1">Contact Number 1</Label>
                                                                <Input id="req-contact1" type="tel" required className="bg-background"/>
                                                            </div>
                                                             <div className="space-y-2">
                                                                <Label htmlFor="req-contact2">Contact Number 2</Label>
                                                                <Input id="req-contact2" type="tel" className="bg-background"/>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="req-state">State</Label>
                                                            <Select required>
                                                                <SelectTrigger id="req-state" className="bg-background">
                                                                    <SelectValue placeholder="Select your state" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-card">
                                                                    {states.map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button type="submit">Submit Request</Button>
                                                    </DialogFooter>
                                                </form>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent">Your Orders</CardTitle>
                    <CardDescription>Track the status of your product requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((req, index) => (
                                <TableRow key={index}>
                                    <TableCell>{req.product}</TableCell>
                                    <TableCell>{req.status}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {req.status === "Requested" && (
                                            <>
                                                <Button size="sm" variant="destructive" onClick={() => handleCancelRequest(index)}>Cancel</Button>
                                                <Button size="sm" className="glow-on-hover">Buy Now</Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
