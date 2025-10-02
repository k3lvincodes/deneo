
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShoppingCart, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/defarm", label: "DeFarm" },
  { href: "/animal-welfare", label: "Animal Welfare" },
  { href: "/insurance", label: "Insurance" },
  { href: "/circular-income", label: "Circular Income" },
  { href: "/roles", label: "Roles" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const pathname = usePathname();

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
        </nav>

        <div className="flex items-center justify-end gap-2 flex-1">
          <Button asChild variant="ghost" size="icon" className="glow-on-hover">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button
            asChild
            className="glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90 hidden lg:flex"
          >
            <Link href="/contribute">Join as Contributor</Link>
          </Button>
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
                  <Button
                    asChild
                    className="w-full glow-on-hover bg-accent text-accent-foreground hover:bg-accent/90"
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
