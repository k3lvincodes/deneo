
"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { CoverageChart } from "@/components/animal-welfare/coverage-chart";
import { ImpactFeed } from "@/components/animal-welfare/impact-feed";
import { PawPrint, ShieldCheck, Siren } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type Stage = 'request_inspection' | 'register_animals' | 'activate_insurance';
type AnimalType = 'lls' | 'sls' | 'pb' | 'fa';

const animalTypeLabels: Record<AnimalType, string> = {
    lls: "Large Livestock",
    sls: "Small Livestock",
    pb: "Poultry Birds",
    fa: "Fishery/Aqua"
};

export default function AnimalWelfarePage() {
    const { toast } = useToast();
    const [stage, setStage] = useState<Stage>('request_inspection');
    const [inspectionId, setInspectionId] = useState<string | null>(null);
    const [registrationId, setRegistrationId] = useState<string | null>(null);
    const [tokenId, setTokenId] = useState<string | null>(null);
    const [tokenUri, setTokenUri] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<AnimalType>('lls');

    const handleRequestInspection = (e: React.FormEvent) => {
        e.preventDefault();
        const mockId = `INSP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        setInspectionId(mockId);
        toast({
            title: "Inspection Requested",
            description: `Your inspection ID is ${mockId}. You will be notified when it's confirmed. (View..._Inspection_ID getter)`,
        });
        
        setTimeout(() => {
            toast({
                title: "Inspection Confirmed!",
                description: "You can now register your animals.",
            });
            setStage('register_animals');
        }, 5000);
    };

    const handleRegisterAnimals = (e: React.FormEvent) => {
        e.preventDefault();
        const mockRegId = `${activeTab.toUpperCase()}-REG-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        setRegistrationId(mockRegId);
        toast({
            title: "Registration Submitted",
            description: `Processing your registration. A fee is required. Please confirm in your wallet.`,
        });
        
        setTimeout(() => {
            toast({
                title: "Registration Successful!",
                description: `Your registration ID is ${mockRegId}. You can now activate insurance.`,
            });
            setStage('activate_insurance');
        }, 3000);
    }
    
    const handleActivateInsurance = (numAnimals: 5 | 10) => {
        const mockTokenId = Math.floor(Math.random() * 100000).toString();
        const mockTokenUri = `https://api.deneo.com/nft/${mockTokenId}`;
        toast({
            title: "Activating Insurance...",
            description: `Requesting insurance for ${numAnimals} animals. Please confirm the transaction. (check lengths via getters)`,
        });

        setTimeout(() => {
            setTokenId(mockTokenId);
            setTokenUri(mockTokenUri);
            toast({
                title: "Insurance Activated!",
                description: `NFT with Token ID ${mockTokenId} has been minted.`,
            });
        }, 3000);
    }

    const renderStageContent = () => {
        switch(stage) {
            case 'request_inspection':
                return (
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Step 1: Request Inspection</CardTitle>
                            <CardDescription>An admin must confirm your farm location before you can register animals.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleRequestInspection}>
                            <CardContent>
                                <Label htmlFor="farm-location">Farm Location</Label>
                                <Input id="farm-location" placeholder="e.g., Green Valley, Sector 4" required className="bg-background mt-2" />
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">Request Inspection</Button>
                            </CardFooter>
                        </form>
                    </Card>
                );
            case 'register_animals':
                 return (
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Step 2: Register Your Animals</CardTitle>
                            <CardDescription>Fill in the details for your {animalTypeLabels[activeTab]}. A registration fee applies.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleRegisterAnimals}>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="client_animal">Animal Type/Breed</Label>
                                    <Input id="client_animal" placeholder="e.g., Holstein Cow, Broiler Chicken" required className="bg-background"/>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="client_health">Health Status</Label>
                                        <Input id="client_health" placeholder="e.g., Excellent, Vaccinated" required className="bg-background"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="client_age">Age of Animal(s)</Label>
                                        <Input id="client_age" placeholder="e.g., 2 years" required className="bg-background"/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client_feeding">Feeding System</Label>
                                    <Input id="client_feeding" placeholder="e.g., Pasture-raised" required className="bg-background"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client_housing">Housing System</Label>
                                    <Input id="client_housing" placeholder="e.g., Free-range" required className="bg-background"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client_insurance_type">Insurance Type</Label>
                                    <Select required defaultValue='monthly'>
                                        <SelectTrigger className="bg-background">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className='bg-card'>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">Pay Fee & Register</Button>
                            </CardFooter>
                        </form>
                    </Card>
                );
            case 'activate_insurance':
                 return (
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Step 3: Activate Insurance & Mint NFT</CardTitle>
                            <CardDescription>Select the number of animals to insure. This will mint an NFT representing your policy.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                            {tokenId && tokenUri ? (
                                <div className='p-4 bg-secondary rounded-lg'>
                                    <h3 className="text-xl font-bold text-accent">Insurance Activated!</h3>
                                    <Image src="https://picsum.photos/seed/nft/400/400" alt="Insurance NFT" width={200} height={200} className="rounded-lg mx-auto my-4 shadow-lg" data-ai-hint="abstract art" />
                                    <p>Your policy is now active.</p>
                                    <div className='mt-4 text-left space-y-2 font-mono text-sm'>
                                        <p><strong>Token ID:</strong> <Badge variant="outline">{tokenId}</Badge></p>
                                        <p><strong>Token URI:</strong> <a href={tokenUri} target="_blank" className="text-accent hover:underline break-all">{tokenUri}</a></p>
                                    </div>
                                    <Button className='mt-4 w-full' onClick={() => { setStage('request_inspection'); setTokenId(null); setTokenUri(null);}}>Start New Application</Button>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <Button size="lg" className="flex-1" onClick={() => handleActivateInsurance(5)}>Insure 5 Animals</Button>
                                    <Button size="lg" className="flex-1" onClick={() => handleActivateInsurance(10)}>Insure 10 Animals</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                );
        }
    };

  return (
    <div className="container mx-auto py-12">
        <div className="text-center mb-12">
            <h1 className="font-headline text-4xl font-bold">Animal Welfare</h1>
            <p className="mt-2 text-lg text-muted-foreground">Transparent, on-chain protection for livestock and wildlife.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-8">
                 <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent">Coverage Dashboard</CardTitle>
                        <CardDescription>Ecosystem-wide insurance metrics from getters.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="my-4">
                            <CoverageChart />
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                <div className="flex items-center gap-3">
                                    <PawPrint className="text-accent"/>
                                    <span className="font-medium">Animals Insured</span>
                                </div>
                                <span className="font-bold text-lg">14,302</span>
                           </div>
                           <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-accent"/>
                                    <span className="font-medium">Welfare Actions</span>
                                </div>
                                <span className="font-bold text-lg">789</span>
                           </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 border-border/50 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-xl text-accent flex items-center gap-2"><Siren/> Report Emergency</CardTitle>
                        <CardDescription>Instantly report animal threats, diseases, or hazards.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full glow-on-hover bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    <Siren className="mr-2 h-4 w-4" /> File Emergency Report
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-card border-border">
                                <DialogHeader>
                                <DialogTitle>New Emergency Report</DialogTitle>
                                <DialogDescription>
                                    Your report will be geo-tagged and logged on-chain.
                                </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="type" className="text-right">
                                            Type
                                        </Label>
                                        <Select>
                                            <SelectTrigger id="type" className="col-span-3 bg-background">
                                                <SelectValue placeholder="Select report type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-card">
                                                <SelectItem value="threat">Threat</SelectItem>
                                                <SelectItem value="disease">Disease</SelectItem>
                                                <SelectItem value="hazard">Hazard</SelectItem>
                                                <SelectItem value="rescue">Rescue Needed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="location" className="text-right">
                                        Location
                                        </Label>
                                        <Input id="location" placeholder="e.g., Sector Gamma, Quadrant 4" className="col-span-3 bg-background" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                        Description
                                        </Label>
                                        <Textarea id="description" placeholder="Describe the situation..." className="col-span-3 bg-background" />
                                    </div>
                                </div>
                                <DialogFooter>
                                <Button type="submit" className="glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">Submit Report</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="bg-card/50 border-border/50 shadow-lg h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent">Animal Health Ledger</CardTitle>
                        <CardDescription>Live feed of welfare activities recorded on-chain.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ImpactFeed />
                    </CardContent>
                </Card>
            </div>
        </div>

        <div className="mt-16">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl font-bold">Insurance Application</h2>
                <p className="mt-2 text-lg text-muted-foreground">Secure on-chain insurance for your valuable animals.</p>
            </div>
             <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AnimalType)} className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-border mb-8">
                    <TabsTrigger value="lls">Large Livestock</TabsTrigger>
                    <TabsTrigger value="sls">Small Livestock</TabsTrigger>
                    <TabsTrigger value="pb">Poultry Birds</TabsTrigger>
                    <TabsTrigger value="fa">Fishery/Aqua</TabsTrigger>
                </TabsList>
                <TabsContent value="lls">
                    {renderStageContent()}
                </TabsContent>
                <TabsContent value="sls">
                    {renderStageContent()}
                </TabsContent>
                <TabsContent value="pb">
                    {renderStageContent()}
                </TabsContent>
                 <TabsContent value="fa">
                    {renderStageContent()}
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
