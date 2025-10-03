
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Search, ShieldCheck } from "lucide-react";

interface NftData {
    tokenId: string;
    tokenUri: string;
    name: string;
    description: string;
    imageUrl: string;
    attributes: { trait_type: string; value: string }[];
}

const placeholderNfts = [
    { tokenId: "101", imageUrl: "https://picsum.photos/seed/nft1/400", name: "LLS Policy #101" },
    { tokenId: "202", imageUrl: "https://picsum.photos/seed/nft2/400", name: "PB Policy #202" },
    { tokenId: "303", imageUrl: "https://picsum.photos/seed/nft3/400", name: "FA Policy #303" },
];

export default function GalleryPage() {
    const { toast } = useToast();
    const [tokenId, setTokenId] = useState("");
    const [nftData, setNftData] = useState<NftData | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchTokenData = (id: string) => {
        if (!id) {
            toast({
                variant: "destructive",
                title: "Token ID Required",
                description: "Please enter a Token ID to search.",
            });
            return;
        }

        setLoading(true);
        setNftData(null);
        toast({
            title: "Fetching NFT Data...",
            description: `Searching for Token ID: ${id}`,
        });

        // Simulate fetching tokenURI and then the metadata
        setTimeout(() => {
            const mockData: NftData = {
                tokenId: id,
                tokenUri: `https://api.deneo.com/nft/${id}`,
                name: `AWI Policy #${id}`,
                description: "This NFT represents a decentralized animal welfare insurance policy, providing on-chain proof of coverage for livestock. It is non-transferable and can only be minted or burned by the system.",
                imageUrl: `https://picsum.photos/seed/${id}/500`,
                attributes: [
                    { trait_type: "Animal Type", value: "Large Livestock" },
                    { trait_type: "Coverage", value: "Monthly" },
                    { trait_type: "Status", value: "Active" },
                ],
            };
            setNftData(mockData);
            setLoading(false);
            toast({
                title: "NFT Found!",
                description: `Displaying metadata for Token ID: ${id}`,
            });
        }, 2000);
    };
    
    const handleFetchToken = (e: React.FormEvent) => {
        e.preventDefault();
        fetchTokenData(tokenId);
    };

    const handleViewDetailsClick = (id: string) => {
        setTokenId(id);
        fetchTokenData(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="container mx-auto py-8 px-4 md:py-12">
            <div className="text-center mb-8 md:mb-12">
                <h1 className="font-headline text-3xl md:text-4xl font-bold">NFT Insurance Gallery</h1>
                <p className="mt-2 text-md md:text-lg text-muted-foreground">View on-chain proof of insurance for assets in the DeNeo ecosystem.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                <div className="lg:col-span-1">
                    <Card className="bg-card/50 border-border/50 shadow-lg">
                        <CardHeader>
                            <CardTitle>Search for a Policy</CardTitle>
                            <CardDescription>Enter a Token ID to view its corresponding insurance NFT.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleFetchToken} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="token-id">Token ID</Label>
                                    <Input
                                        id="token-id"
                                        placeholder="e.g., 101"
                                        value={tokenId}
                                        onChange={(e) => setTokenId(e.target.value)}
                                        className="bg-background"
                                    />
                                </div>
                                <Button type="submit" className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
                                    <Search className="mr-2 h-4 w-4" />
                                    {loading ? "Searching..." : "View Token"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    {nftData ? (
                        <Card className="bg-card/50 border-border/50 shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                                <div className="aspect-square">
                                    <Image src={nftData.imageUrl} alt={nftData.name} width={500} height={500} className="rounded-lg object-cover w-full h-full" data-ai-hint="abstract art" />
                                </div>
                                <div className="flex flex-col">
                                    <CardHeader className="p-0">
                                        <CardTitle className="text-xl md:text-2xl text-accent">{nftData.name}</CardTitle>
                                        <CardDescription className="pt-2">{nftData.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-0 pt-4 space-y-4 flex-grow">
                                        <h4 className="font-semibold text-foreground">Attributes</h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {nftData.attributes.map(attr => (
                                                <div key={attr.trait_type} className="p-3 bg-secondary rounded-md">
                                                    <p className="text-xs text-muted-foreground">{attr.trait_type}</p>
                                                    <p className="font-semibold text-sm">{attr.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="font-mono text-xs space-y-2 pt-2">
                                            <div className="flex items-center gap-2">
                                                <strong className="text-muted-foreground">Token ID:</strong>
                                                <Badge variant="outline">{nftData.tokenId}</Badge>
                                            </div>
                                            <div>
                                                <strong className="text-muted-foreground">Token URI:</strong> <a href={nftData.tokenUri} target="_blank" className="text-accent hover:underline break-all">{nftData.tokenUri}</a>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="p-0 pt-4">
                                        <Button variant="outline" className="w-full" disabled>
                                            <ShieldCheck className="mr-2" /> Non-Transferable
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ) : (
                         <div className="flex items-center justify-center h-full min-h-[400px] bg-card/20 rounded-lg border-2 border-dashed border-border">
                            <p className="text-muted-foreground">Search for an NFT to see its details here.</p>
                        </div>
                    )}
                </div>
            </div>

             <div className="mt-12 md:mt-16">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="font-headline text-2xl md:text-3xl font-bold">My Collection</h2>
                    <p className="mt-2 text-md md:text-lg text-muted-foreground">A preview of recently minted insurance policies.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {placeholderNfts.map(nft => (
                        <Card key={nft.tokenId} className="bg-card/50 border-border/50 shadow-lg overflow-hidden group">
                           <div className="overflow-hidden">
                                <Image src={nft.imageUrl} alt={nft.name} width={400} height={400} className="w-full h-auto object-cover aspect-square group-hover:scale-105 transition-transform duration-300" data-ai-hint="abstract art" />
                           </div>
                           <div className="p-4">
                                <h3 className="font-semibold text-foreground">{nft.name}</h3>
                                <p className="text-sm text-muted-foreground">Token ID: {nft.tokenId}</p>
                                <Button size="sm" className="w-full mt-4" onClick={() => handleViewDetailsClick(nft.tokenId)}>View Details</Button>
                           </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}