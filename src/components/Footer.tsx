import { Github, Linkedin, FileText } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/links";

export const Footer = () => {
  const links = [
    { icon: Github, label: "GitHub", href: SOCIAL_LINKS.github },
    { icon: Linkedin, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
    { icon: FileText, label: "Resume", href: SOCIAL_LINKS.resumeView },
  ];

  return (
    <footer className="border-t border-border/30 py-8 pb-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2.5 rounded-full border border-foreground/10 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300"
              >
                <Icon className="h-4 w-4 text-foreground/70" />
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Designed & Built by <span className="text-primary font-semibold">Harsha Vardhan Katuri</span>
          </p>
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
