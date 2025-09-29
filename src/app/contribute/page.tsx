
"use client";

import { useState, useRef, useEffect } from "react";
import { TierProgression } from "@/components/contribute/tier-progression";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle, Award, Zap, Camera, Upload, Trash2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { cn } from "@/lib/utils";

const benefits = [
    "Increased token rewards",
    "Access to exclusive marketplace items",
    "Governance voting rights",
    "Priority support",
    "Early access to new features",
    "Direct line to development team"
];

const missions = [
    { title: "Plant 5 Trees", reward: "Bonus Tokens", icon: Zap },
    { title: "Report 2 Hazards", reward: "Community Badge", icon: Award },
    { title: "Verify a Farm", reward: "Reputation Points", icon: Zap },
]

export default function ContributePage() {
    const { toast } = useToast();
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const getCameraPermission = async () => {
        if (showCamera && typeof window !== 'undefined' && navigator.mediaDevices) {
            try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setHasCameraPermission(true);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            } catch (error) {
            console.error("Error accessing camera:", error);
            setHasCameraPermission(false);
            }
        }
        };
        getCameraPermission();

        return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        };
    }, [showCamera]);

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL("image/jpeg");
            setCapturedImage(dataUrl);
            setShowCamera(false); 
        }
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setCapturedImage(e.target?.result as string);
            setShowCamera(false); 
        };
        reader.readAsDataURL(file);
        }
    };

    const handleProviderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!capturedImage) {
        toast({
            variant: "destructive",
            title: "Missing Photo",
            description: "Please upload or capture a face photo to register.",
        });
        return;
        }
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
                <h1 className="font-headline text-4xl font-bold">Contributor Portal</h1>
                <p className="mt-2 text-lg text-muted-foreground">Grow with the ecosystem and unlock new benefits.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Tier Progression</CardTitle>
                            <CardDescription>Advance through tiers by contributing value to the network.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <TierProgression />
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50 shadow-lg mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Contributor Benefits</CardTitle>
                             <CardDescription>Benefits unlocked at higher tiers.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-center">
                                        <CheckCircle className="h-5 w-5 mr-3 text-accent" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card className="bg-card/50 border-border/50 shadow-lg mt-8">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Community Missions</CardTitle>
                             <CardDescription>Complete quests to earn rewards and build your reputation.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <div className="space-y-4">
                                {missions.map((mission, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <mission.icon className="text-accent"/>
                                            <span className="font-medium">{mission.title}</span>
                                        </div>
                                        <span className="font-bold text-sm text-accent">{mission.reward}</span>
                                </div>
                                ))}
                           </div>
                        </CardContent>
                    </Card>
                </div>
                 <div>
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl text-accent">Become a Contributor</CardTitle>
                            <CardDescription>Register as a provider or consumer to start your journey.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="provider" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 bg-card/50 border border-border">
                                    <TabsTrigger value="provider">Farm Provider</TabsTrigger>
                                    <TabsTrigger value="consumer">Farm Consumer</TabsTrigger>
                                </TabsList>
                                <TabsContent value="provider">
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
                                                        !showCamera && !capturedImage ? "h-10 flex items-center justify-center p-0" : "p-4 space-y-4"
                                                    )}>
                                                        {capturedImage ? (
                                                        <div className="space-y-2 text-center">
                                                            <Image src={capturedImage} alt="Captured face" width={200} height={150} className="rounded-md mx-auto" />
                                                            <Button variant="outline" size="sm" onClick={() => { setCapturedImage(null); setShowCamera(true); }}>
                                                            <Trash2 className="mr-2 h-4 w-4" /> Retake Photo
                                                            </Button>
                                                        </div>
                                                        ) : !showCamera ? (
                                                        <Button type="button" variant="outline" onClick={() => setShowCamera(true)} className="w-full h-full">
                                                                <ImagePlus className="mr-2 h-4 w-4" /> Add Face Photo
                                                            </Button>
                                                        ) : (
                                                        <div className="space-y-4">
                                                            <video ref={videoRef} className="w-full aspect-video rounded-md bg-muted" autoPlay muted playsInline />
                                                            <canvas ref={canvasRef} className="hidden" />
                                                            {hasCameraPermission === false && (
                                                            <Alert variant="destructive">
                                                                <AlertTitle>Camera Access Denied</AlertTitle>
                                                                <AlertDescription>
                                                                Please enable camera permissions to capture a photo. You can still upload an image.
                                                                </AlertDescription>
                                                            </Alert>
                                                            )}
                                                            <div className="flex gap-2">
                                                            <Button type="button" onClick={handleCapture} disabled={!hasCameraPermission} className="flex-1">
                                                                <Camera className="mr-2 h-4 w-4" /> Capture
                                                            </Button>
                                                            <Button type="button" variant="secondary" className="flex-1" onClick={() => fileInputRef.current?.click()}>
                                                                <Upload className="mr-2 h-4 w-4" /> Upload
                                                            </Button>
                                                            <Input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                                                            </div>
                                                        </div>
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
                                </TabsContent>
                                <TabsContent value="consumer">
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
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                 </div>
            </div>
        </div>
    );
}
