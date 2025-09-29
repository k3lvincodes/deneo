
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Eye } from "lucide-react";

const homePickOrders = [
    { buyer: "0xAb...c1d2", product: "Organic Corn", destination: "123 Green St, Terra" },
    { buyer: "0xCd...e3f4", product: "Artisanal Cheese", destination: "456 Eco Ave, Gaia" },
];

const states = ["Abuja", "Lagos", "Kano", "Oyo", "Rivers", "Kaduna", "Sokoto"];

export default function AdminPage() {
    const { toast } = useToast();

    const handleNotify = () => {
        toast({
            title: "Admin Notified",
            description: "A notification has been sent to view home pick orders.",
        });
    };

    const handleUpdateLocations = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Locations Updated",
            description: "State pickup locations have been successfully updated on-chain.",
        });
    };

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl font-bold">Admin Panel</h1>
                <p className="mt-2 text-lg text-muted-foreground">Manage ecosystem settings and view orders.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Home Pickup Orders</CardTitle>
                            <CardDescription>View and manage home delivery requests.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 mb-6">
                                <Button onClick={handleNotify} className="flex-1">
                                    <Bell className="mr-2" /> Notify Admin to View
                                </Button>
                                <Button variant="outline" className="flex-1">
                                    <Eye className="mr-2" /> View Orders
                                </Button>
                            </div>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Buyer</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Destination</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {homePickOrders.map((order, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="font-mono">{order.buyer}</TableCell>
                                            <TableCell>{order.product}</TableCell>
                                            <TableCell>{order.destination}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Set Pickup Locations</CardTitle>
                            <CardDescription>Add or update the pickup addresses for each state.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateLocations} className="space-y-4">
                                {states.map(state => (
                                    <div key={state} className="space-y-2">
                                        <Label htmlFor={`loc-${state}`}>{state} Address</Label>
                                        <Input
                                            id={`loc-${state}`}
                                            placeholder={`Enter pickup address for ${state}`}
                                            className="bg-background"
                                        />
                                    </div>
                                ))}
                                <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                                    Update Locations
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
