
"use client";

import { useState, useRef } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useWallet } from "../shared/wallet-provider";

interface ProviderRegistrationProps {
    onRegister: () => void;
}

export function ProviderRegistration({ onRegister }: ProviderRegistrationProps) {
    const { toast } = useToast();
    const { handleConnect, isConnected, handleRegister } = useWallet();
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadedImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProviderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadedImage) {
            toast({
                variant: "destructive",
                title: "Missing Photo",
                description: "Please upload a face photo to register.",
            });
            return;
        }
        // Mock transaction
        toast({
            title: "Transaction Sent",
            description: "Please confirm the transaction in your wallet to pay the registration fee.",
        });
        
        // On success, call the onRegister callback
        setTimeout(() => {
            toast({ title: "Registration Successful!", description: "Welcome to the DeNeo ecosystem." });
            if (!isConnected) {
                handleConnect();
            }
            handleRegister();
            onRegister();
        }, 3000); // Simulate delay for wallet confirmation
    };

    return (
        <form onSubmit={handleProviderSubmit}>
            <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="provider-name">Full Name</Label>
                        <Input
                            id="provider-name"
                            placeholder="e.g., John Appleseed"
                            required
                            className="bg-background"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                            id="experience"
                            type="number"
                            placeholder="e.g., 10"
                            required
                            className="bg-background"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="farm-size">Farm Size</Label>
                        <Input
                            id="farm-size"
                            placeholder="e.g., 100 Hectares"
                            required
                            className="bg-background"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="face-photo">Face Photo</Label>
                        <div className={cn(
                            "border rounded-md bg-background",
                            !uploadedImage ? "h-10 flex items-center justify-center p-0" : "p-4 space-y-4"
                        )}>
                            {uploadedImage ? (
                                <div className="space-y-2 text-center">
                                    <Image src={uploadedImage} alt="Uploaded face" width={100} height={100} className="rounded-md mx-auto aspect-square object-cover" />
                                    <Button variant="outline" size="sm" onClick={() => setUploadedImage(null)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Remove
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full h-full">
                                        <Upload className="mr-2 h-4 w-4" /> Upload
                                    </Button>
                                    <Input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="proof">Proof of Work</Label>
                    <Textarea
                        id="proof"
                        placeholder="Link to documents, certifications, or a detailed description of your regenerative practices."
                        required
                        className="bg-background"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="products">Product Names</Label>
                    <Textarea
                        id="products"
                        placeholder="Enter product names, separated by commas (e.g., Organic Corn, Fresh Milk, Artisanal Cheese)"
                        required
                        className="bg-background"
                    />
                    <p className="text-xs text-muted-foreground">The number of products will be calculated automatically.</p>
                </div>
            </CardContent>
            <CardFooter className="pt-6">
                <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                    Pay Registration Fee & Register
                </Button>
            </CardFooter>
        </form>
    );
}
