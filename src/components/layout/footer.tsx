import { Logo } from "@/components/shared/logo";
import { Twitter, Linkedin, Gitlab } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-2 text-center md:flex-row md:gap-4 md:text-left">
          <Logo />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DeNeo Nexus. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter size={20} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin size={20} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Gitlab size={20} />
            </a>
        </div>
      </div>
    </footer>
  );
}
