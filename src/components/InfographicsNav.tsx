import {
  infographicSections,
  infographicsParent,
} from "@/lib/infographics";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const InfographicsNav = ({
  activeHref,
}: {
  activeHref: string;
}) => {
  return (
    <nav className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-4">
      <Link
        href={infographicsParent.href}
        className={cn(
          "text-[11px] uppercase tracking-[0.14em] text-neutral-500 hover:text-black",
          activeHref === infographicsParent.href && "font-semibold text-black"
        )}
      >
        All
      </Link>
      {infographicSections.map((section) => (
        <Link
          key={section.slug}
          href={section.href}
          className={cn(
            "text-[11px] uppercase tracking-[0.14em] text-neutral-500 hover:text-black",
            activeHref === section.href && "font-semibold text-black"
          )}
        >
          {section.label}
        </Link>
      ))}
    </nav>
  );
};
