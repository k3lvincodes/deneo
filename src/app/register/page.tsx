
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const { toast } = useToast();
  const [productCount, setProductCount] = useState(1);

  const handleProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock transaction
    toast({
      title: "Transaction Sent",
      description: "Please confirm the transaction in your wallet to pay the registration fee.",
    });
    // On success:
    // toast({ title: "Registration Successful!", description: "Welcome to the DeNeo ecosystem." });
  };
  
  const handleConsumerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration
    const mockId = Math.floor(Math.random() * 100000);
    toast({
      title: "Registration Successful!",
      description: `Welcome! Your consumer ID is YFC_${mockId}.`,
    });
  };


  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Join the Ecosystem</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Register as a provider or consumer to start your journey.
        </p>
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="provider" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border">
            <TabsTrigger value="provider">Farm Provider</TabsTrigger>
            <TabsTrigger value="consumer">Farm Consumer</TabsTrigger>
          </TabsList>
          <TabsContent value="provider">
            <Card className="bg-card/50 border-border/50 shadow-lg">
              <form onSubmit={handleProviderSubmit}>
                <CardHeader>
                  <CardTitle>Provider Registration</CardTitle>
                  <CardDescription>
                    Complete the form below to list your farm on the DeNeo
                    marketplace. A one-time registration fee is required.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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
                      <Label htmlFor="face-photo">Face Photo URL</Label>
                      <Input
                        id="face-photo"
                        placeholder="https://example.com/photo.jpg"
                        required
                        className="bg-background"
                      />
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
                <CardFooter>
                  <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                    Pay Registration Fee & Register
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="consumer">
            <Card className="bg-card/50 border-border/50 shadow-lg">
              <form onSubmit={handleConsumerSubmit}>
                <CardHeader>
                  <CardTitle>Consumer Registration</CardTitle>
                  <CardDescription>
                    Create a free account to start purchasing from regenerative
                    farms.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                <CardFooter>
                  <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                    Register
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
