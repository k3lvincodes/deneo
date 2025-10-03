
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart, Menu, Wallet } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


const navLinks = [
  { href: "/defarm", label: "DeFarm" },
  { href: "/animal-welfare", label: "Animal Welfare" },
  { href: "/circular-income", label: "Circular Income" },
  { href: "/roles", label: "Roles" },
];

export function Header() {
  const pathname = usePathname();
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState("");

  const handleConnect = () => {
    // This is a mock connection handler
    toast({
        title: "Connecting to wallet...",
        description: "Please approve the connection in your wallet provider.",
    });

    setTimeout(() => {
        const mockAddress = "0x" + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('');
        setUserAddress(mockAddress);
        setIsConnected(true);
        toast({
            title: "Wallet Connected",
            description: `Address: ${mockAddress.substring(0, 6)}...${mockAddress.substring(mockAddress.length - 4)}`,
        });
    }, 2000);
  };

  const handleDisconnect = () => {
      setIsConnected(false);
      setUserAddress("");
      toast({
          title: "Wallet Disconnected",
      });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center">
        <div className="flex items-center justify-start flex-1">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center justify-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-accent whitespace-nowrap",
                pathname === link.href ? "text-accent" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
           {isConnected && (
             <Link
              href="/admin"
              className={cn(
                "transition-colors hover:text-accent whitespace-nowrap",
                pathname === "/admin" ? "text-accent" : "text-foreground/60"
              )}
            >
              Admin
            </Link>
           )}
        </nav>

        <div className="flex items-center justify-end gap-2 flex-1">
          <Button asChild variant="ghost" size="icon" className="glow-on-hover">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          
           {!isConnected ? (
                <Button onClick={handleConnect} className="glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90 hidden lg:flex">
                    <Wallet className="mr-2" /> Connect Wallet
                </Button>
            ) : (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="hidden lg:flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                                <AvatarFallback className="bg-secondary text-xs">0x</AvatarFallback>
                            </Avatar>
                            <span>{`${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-card">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(userAddress)}>Copy Address</DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDisconnect}>Disconnect</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="glow-on-hover">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4 gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-accent",
                        pathname === link.href
                          ? "text-accent"
                          : "text-foreground/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                   {isConnected && (
                     <Link
                      href="/admin"
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-accent",
                        pathname === "/admin"
                          ? "text-accent"
                          : "text-foreground/60"
                      )}
                    >
                      Admin
                    </Link>
                   )}
                  {!isConnected ? (
                        <Button onClick={handleConnect} className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90">
                           <Wallet className="mr-2" /> Connect Wallet
                        </Button>
                    ) : (
                        <Button variant="outline" disabled>
                            {`${userAddress.substring(0, 6)}...${userAddress.substring(userAddress.length - 4)}`}
                        </Button>
                    )}
                  <Button
                    asChild
                    className="w-full glow-on-hover"
                  >
                    <Link href="/contribute">Join as Contributor</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
