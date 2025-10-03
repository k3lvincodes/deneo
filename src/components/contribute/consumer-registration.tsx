
"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "../shared/wallet-provider";

interface ConsumerRegistrationProps {
    onRegister: () => void;
}

export function ConsumerRegistration({ onRegister }: ConsumerRegistrationProps) {
    const { toast } = useToast();
    const { handleConnect, isConnected } = useWallet();
    
    const handleConsumerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock registration
        const mockId = Math.floor(Math.random() * 100000);
        toast({
            title: "Registration Successful!",
            description: `Welcome! Your consumer ID is YFC_${mockId}.`,
        });

        if (!isConnected) {
            handleConnect();
        }
        
        onRegister();
    };

    return (
        <form onSubmit={handleConsumerSubmit}>
            <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                    <Label htmlFor="consumer-name">Full Name</Label>
                    <Input
                    id="consumer-name"
                    placeholder="e.g., Jane Doe"
                    required
                    className="bg-background"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="jane.doe@example.com"
                    required
                    className="bg-background"
                    />
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                    Register
                </Button>
            </CardFooter>
        </form>
    );
}
