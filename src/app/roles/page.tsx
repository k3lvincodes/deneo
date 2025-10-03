
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DollarSign } from "lucide-react";

export default function RolesPage() {
    const { toast } = useToast();

    const handleRoleSubmit = (role: string, requiredCode: number) => (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const nameInput = form.elements.namedItem(`${role}-name`) as HTMLInputElement;
        const codeInput = form.elements.namedItem(`${role}-code`) as HTMLInputElement;

        if (parseInt(codeInput.value) !== requiredCode) {
            toast({
                variant: "destructive",
                title: "Incorrect Code",
                description: `The code for ${role.toUpperCase()} submission is incorrect.`,
            });
            return;
        }

        toast({
            title: "Submitting Application...",
            description: `Please confirm the transaction in your wallet for ${role.toUpperCase()} application.`,
        });
        
        setTimeout(() => {
            toast({
                title: "Application Submitted",
                description: `Your application for the ${role.toUpperCase()} role has been submitted successfully.`,
            });
            form.reset();
        }, 3000);
    };

    const handleRequestPfpc = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        toast({
            title: "Sending Request...",
            description: "Please confirm the transaction to send your PFPC request.",
        });
        setTimeout(() => {
            toast({
                title: "Request Sent",
                description: "Your PFPC request has been sent.",
            });
            form.reset();
        }, 3000);
    };

    const handleDeposit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const amountInput = form.elements.namedItem('deposit-amount') as HTMLInputElement;
        toast({
            title: "Processing Deposit...",
            description: `Depositing ${amountInput.value} ETH. Please confirm transaction.`,
        });
        setTimeout(() => {
            toast({
                title: "Deposit Successful",
                description: `${amountInput.value} ETH has been deposited to DeNeo.`,
            });
            form.reset();
        }, 3000);
    };

    return (
        <div className="container mx-auto py-8 px-4 md:py-12">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="font-headline text-3xl md:text-4xl font-bold">Company Roles & Funding</h1>
                <p className="mt-2 text-md md:text-lg text-muted-foreground">Apply for key roles or contribute to the ecosystem.</p>
            </div>

            <Tabs defaultValue="apply" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border">
                    <TabsTrigger value="apply">Apply for a Role</TabsTrigger>
                    <TabsTrigger value="funding">Funding & Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="apply">
                    <Card className="bg-card/50 border-border/50 shadow-lg mt-8">
                        <CardHeader>
                            <CardTitle>Role Applications</CardTitle>
                            <CardDescription>Submit your name and the correct code to apply for a role. A fee is required.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="sfpc">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="sfpc">SFPC</TabsTrigger>
                                    <TabsTrigger value="fpc">FPC</TabsTrigger>
                                    <TabsTrigger value="pfpc">PFPC</TabsTrigger>
                                </TabsList>
                                <TabsContent value="sfpc" className="pt-6">
                                    <form onSubmit={handleRoleSubmit('sfpc', 10)}>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="sfpc-name">Your Name</Label>
                                                <Input id="sfpc-name" name="sfpc-name" placeholder="Enter your name" required className="bg-background"/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="sfpc-code">SFPC Code</Label>
                                                <Input id="sfpc-code" name="sfpc-code" type="number" placeholder="Must be 10" required className="bg-background"/>
                                            </div>
                                            <Button type="submit" className="w-full">Submit SFPC Application</Button>
                                        </div>
                                    </form>
                                </TabsContent>
                                <TabsContent value="fpc" className="pt-6">
                                    <form onSubmit={handleRoleSubmit('fpc', 15)}>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="fpc-name">Your Name</Label>
                                                <Input id="fpc-name" name="fpc-name" placeholder="Enter your name" required className="bg-background"/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="fpc-code">FPC Code</Label>
                                                <Input id="fpc-code" name="fpc-code" type="number" placeholder="Must be 15" required className="bg-background"/>
                                            </div>
                                            <Button type="submit" className="w-full">Submit FPC Application</Button>
                                        </div>
                                    </form>
                                </TabsContent>
                                <TabsContent value="pfpc" className="pt-6">
                                    <form onSubmit={handleRoleSubmit('pfpc', 20)}>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="pfpc-name">Your Name</Label>
                                                <Input id="pfpc-name" name="pfpc-name" placeholder="Enter your name" required className="bg-background"/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pfpc-code">PFPC Code</Label>
                                                <Input id="pfpc-code" name="pfpc-code" type="number" placeholder="Must be 20" required className="bg-background"/>
                                            </div>
                                            <Button type="submit" className="w-full">Submit PFPC Application</Button>
                                        </div>
                                    </form>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="funding">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                         <Card className="bg-card/50 border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-lg"><DollarSign /> Deposit Funds</CardTitle>
                                <CardDescription>Make a general deposit to the DeNeo ecosystem fund.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleDeposit}>
                                <CardContent>
                                    <Label htmlFor="deposit-amount">Amount (ETH)</Label>
                                    <Input id="deposit-amount" name="deposit-amount" type="number" step="0.01" placeholder="e.g., 5" required className="bg-background mt-2" />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full glow-on-hover">Deposit to DeNeo</Button>
                                </CardFooter>
                            </form>
                        </Card>
                        <Card className="bg-card/50 border-border/50 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg">Request PFPC</CardTitle>
                                <CardDescription>Send a request for a PFPC. A fee is required for this action.</CardDescription>
                            </CardHeader>
                            <form onSubmit={handleRequestPfpc}>
                                <CardContent>
                                    <Label htmlFor="pfpc-request-note">Request Note</Label>
                                    <Textarea id="pfpc-request-note" name="pfpc-request-note" placeholder="Explain why you are requesting a PFPC..." required className="bg-background mt-2" />
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" className="w-full glow-on-hover">Send PFPC Request</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
