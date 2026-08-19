import { config } from "@/config";
import { Button } from "./ui/button";
import { Linkedin, Rss } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="container mx-auto my-4 px-4 max-w-6xl">
      <div className="flex justify-between items-center">
        <div className="text-sm mt-4">
          © {config.organization} {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={config.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer me"
            aria-label="Product Wire on LinkedIn"
          >
            <Button variant="ghost">
              <Linkedin className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/rss" aria-label="RSS feed">
            <Button variant="ghost">
              <Rss className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
