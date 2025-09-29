
"use client";

import { useState, useRef, useEffect } from "react";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Camera, Upload, Trash2, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProviderRegistrationProps {
    onRegister: () => void;
}

export function ProviderRegistration({ onRegister }: ProviderRegistrationProps) {
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
        
        // On success, call the onRegister callback
        setTimeout(() => {
            toast({ title: "Registration Successful!", description: "Welcome to the DeNeo ecosystem." });
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
    );
}
