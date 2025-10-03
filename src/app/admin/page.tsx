
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bell, Eye, UserPlus, DollarSign, CheckCircle, ShieldX, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const homePickOrders = [
    { buyer: "0xAb...c1d2", product: "Organic Corn", destination: "123 Green St, Terra" },
    { buyer: "0xCd...e3f4", product: "Artisanal Cheese", destination: "456 Eco Ave, Gaia" },
];

const states = ["Abuja", "Lagos", "Kano", "Oyo", "Rivers", "Kaduna", "Sokoto"];

const inspectionRequests = [
    { id: "INSP-001", type: "Large Livestock", location: "Green Valley Farms", status: "Pending"},
    { id: "INSP-002", type: "Poultry Birds", location: "Sunrise Hatchery", status: "Pending"},
    { id: "INSP-003", type: "Fishery/Aqua", location: "Ocean's Bounty", status: "Confirmed"},
];

const insuredUsers = [
    { id: "USR-A1", name: "Farmer John", policy: "LLS-Monthly", status: "Active"},
    { id: "USR-B2", name: "Aqua Farms Inc.", policy: "FA-Monthly", status: "Active"},
    { id: "USR-C3", name: "Chicken Coop Co.", policy: "PB-Monthly", status: "Expired"},
]

export default function AdminPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState<Record<string, boolean>>({});

    const handleAction = async (key: string, actionFn: () => Promise<any>, successTitle: string, successDescription: string) => {
        setLoading(prev => ({...prev, [key]: true}));
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate async action
            toast({
                title: successTitle,
                description: successDescription,
            });
        } catch (error: any) {
             toast({
                variant: "destructive",
                title: "Action Failed",
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setLoading(prev => ({...prev, [key]: false}));
        }
    };

    const handleNotify = () => {
        handleAction('notify', async () => {}, "Admin Notified", "A notification has been sent to view home pick orders.");
    };

    const handleUpdateLocations = (e: React.FormEvent) => {
        e.preventDefault();
        handleAction('updateLocations', async () => {}, "Locations Updated", "State pickup locations have been successfully updated on-chain.");
    };
    
    const handleRegisterRole = (role: string) => (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const nameInput = form.elements.namedItem(`${role}-name`) as HTMLInputElement;
        handleAction(`register-${role}`, async () => {}, `${role.toUpperCase()} Registered`, `${nameInput.value} has been registered as ${role.toUpperCase()}.`);
    };
    
    const handlePayWages = (role: string) => () => {
        handleAction(`pay-${role}`, async () => {}, `Paying ${role.toUpperCase()} Wages`, `A transaction has been initiated to pay all ${role.toUpperCase()} members.`);
    }

    const handleConfirmInspection = (id: string) => {
         handleAction(`confirm-${id}`, async () => {}, "Inspection Confirmed", `Inspection ${id} has been confirmed. The user can now register their animals.`);
    }

    const handleResetInsurance = (userId: string) => {
        handleAction(`reset-${userId}`, async () => {}, "Insurance Reset", `Insurance for user ${userId} has been reset.`);
    }

    return (
        <div className="container mx-auto py-12">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl font-bold">Admin Panel</h1>
                <p className="mt-2 text-lg text-muted-foreground">Manage ecosystem settings, roles, and orders. (Owner-only access)</p>
            </div>

            <Tabs defaultValue="general">
                 <div className="flex justify-center mb-8">
                    <TabsList className="bg-card/50 border border-border">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="roles">Role Management</TabsTrigger>
                        <TabsTrigger value="payroll">Payroll</TabsTrigger>
                        <TabsTrigger value="insurance">Insurance Admin</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="general">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="space-y-8">
                            <Card className="bg-card/50 border-border/50 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl text-accent">Home Pickup Orders</CardTitle>
                                    <CardDescription>View and manage home delivery requests.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-4 mb-6">
                                        <Button onClick={handleNotify} className="flex-1" disabled={loading['notify']}>
                                            {loading['notify'] ? <Loader2 className="mr-2 animate-spin" /> : <Bell className="mr-2" />} Notify Admin to View
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
                                        <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading['updateLocations']}>
                                            {loading['updateLocations'] && <Loader2 className="mr-2 animate-spin" />}
                                            Update Locations
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
                
                <TabsContent value="roles">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <Card className="bg-card/50 border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><UserPlus /> Register SFPC</CardTitle>
                            </CardHeader>
                            <form onSubmit={handleRegisterRole('sfpc')}>
                                <CardContent>
                                    <Label htmlFor="sfpc-name">SFPC Name</Label>
                                    <Input id="sfpc-name" name="sfpc-name" placeholder="Enter SFPC name" className="bg-background mt-2" />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full" disabled={loading['register-sfpc']}>
                                        {loading['register-sfpc'] && <Loader2 className="mr-2 animate-spin" />}
                                        Register SFPC
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                         <Card className="bg-card/50 border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><UserPlus /> Register FPC</CardTitle>
                            </CardHeader>
                             <form onSubmit={handleRegisterRole('fpc')}>
                                <CardContent>
                                    <Label htmlFor="fpc-name">FPC Name</Label>
                                    <Input id="fpc-name" name="fpc-name" placeholder="Enter FPC name" className="bg-background mt-2" />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full" disabled={loading['register-fpc']}>
                                        {loading['register-fpc'] && <Loader2 className="mr-2 animate-spin" />}
                                        Register FPC
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                         <Card className="bg-card/50 border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><UserPlus /> Register PFPC</CardTitle>
                                <CardDescription>Fee applies for PFPC registration.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleRegisterRole('pfpc')}>
                                <CardContent>
                                    <Label htmlFor="pfpc-name">PFPC Name</Label>
                                    <Input id="pfpc-name" name="pfpc-name" placeholder="Enter PFPC name" className="bg-background mt-2" />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full" disabled={loading['register-pfpc']}>
                                        {loading['register-pfpc'] && <Loader2 className="mr-2 animate-spin" />}
                                        Register PFPC (Payable)
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="payroll">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="bg-card/50 border-border/50 shadow-lg text-center">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2"><DollarSign /> Pay SFPC Wages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Click to execute batch payment for all registered SFPC members.</p>
                                <Button onClick={handlePayWages('sfpc')} className="w-full glow-on-hover" disabled={loading['pay-sfpc']}>
                                    {loading['pay-sfpc'] && <Loader2 className="mr-2 animate-spin" />}
                                    Pay All SFPCs
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 border-border/50 shadow-lg text-center">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2"><DollarSign /> Pay FPC Wages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Click to execute batch payment for all registered FPC members.</p>
                                <Button onClick={handlePayWages('fpc')} className="w-full glow-on-hover" disabled={loading['pay-fpc']}>
                                    {loading['pay-fpc'] && <Loader2 className="mr-2 animate-spin" />}
                                    Pay All FPCs
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 border-border/50 shadow-lg text-center">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center gap-2"><DollarSign /> Pay PFPC Wages</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">Click to execute batch payment for all registered PFPC members.</p>
                                <Button onClick={handlePayWages('pfpc')} className="w-full glow-on-hover" disabled={loading['pay-pfpc']}>
                                    {loading['pay-pfpc'] && <Loader2 className="mr-2 animate-spin" />}
                                    Pay All PFPCs
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="insurance">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="bg-card/50 border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle>Inspection Request Queue</CardTitle>
                                <CardDescription>Confirm pending inspection requests.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Request ID</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {inspectionRequests.map(req => (
                                            <TableRow key={req.id}>
                                                <TableCell className="font-mono">{req.id}</TableCell>
                                                <TableCell>{req.type}</TableCell>
                                                <TableCell>{req.location}</TableCell>
                                                <TableCell>
                                                    {req.status === 'Pending' ? (
                                                         <Button size="sm" onClick={() => handleConfirmInspection(req.id)} disabled={loading[`confirm-${req.id}`]}>
                                                            {loading[`confirm-${req.id}`] ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />} Confirm
                                                        </Button>
                                                    ) : (
                                                        <Badge variant="outline">Confirmed</Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                         <Card className="bg-card/50 border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle>Reset Monthly Insurance</CardTitle>
                                <CardDescription>Reset insurance status for users.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>User ID</TableHead>
                                            <TableHead>Policy</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {insuredUsers.map(user => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-mono">{user.id}</TableCell>
                                                <TableCell>{user.policy}</TableCell>
                                                <TableCell>
                                                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'} className={user.status === 'Active' ? 'bg-accent text-accent-foreground' : ''}>
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Button variant="destructive" size="sm" onClick={() => handleResetInsurance(user.id)} disabled={loading[`reset-${user.id}`]}>
                                                        {loading[`reset-${user.id}`] ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldX className="mr-2 h-4 w-4" />} Reset
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
