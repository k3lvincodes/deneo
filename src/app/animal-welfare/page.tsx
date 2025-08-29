import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CoverageChart } from "@/components/animal-welfare/coverage-chart";
import { ImpactFeed } from "@/components/animal-welfare/impact-feed";
import { PawPrint, ShieldCheck } from "lucide-react";

export default function AnimalWelfarePage() {
  return (
    <div className="container mx-auto py-12">
        <div className="text-center mb-12">
            <h1 className="font-headline text-5xl font-bold">Animal Welfare Insurance</h1>
            <p className="mt-2 text-lg text-muted-foreground">Transparent, on-chain protection for livestock and wildlife.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                 <Card className="bg-card/50 border-border/50 shadow-lg h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent">Coverage Dashboard</CardTitle>
                        <CardDescription>Ecosystem-wide insurance metrics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px] my-4">
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
            </div>
            <div className="lg:col-span-2">
                <Card className="bg-card/50 border-border/50 shadow-lg h-full">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent">Proof-of-Impact Feed</CardTitle>
                        <CardDescription>Live feed of welfare activities recorded on-chain.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ImpactFeed />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}
