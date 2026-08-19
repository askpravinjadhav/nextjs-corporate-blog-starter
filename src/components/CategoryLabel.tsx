import Link from "next/link";
import { cn } from "@/lib/utils";

export const CategoryLabel = ({
  label,
  tag,
  className,
}: {
  label: string;
  tag: string;
  className?: string;
}) => {
  const href = tag === "latest" ? "/" : `/category/${tag}`;
  return (
    <Link
      href={href}
      className={cn(
        "text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2563eb] hover:underline",
        className
      )}
    >
      {label}
    </Link>
  );
};
