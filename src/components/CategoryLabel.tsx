import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCategoryHref } from "@/lib/postCategory";

export const CategoryLabel = ({
  label,
  tag,
  className,
}: {
  label: string;
  tag: string;
  className?: string;
}) => {
  return (
    <Link
      href={getCategoryHref(tag)}
      className={cn(
        "text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2563eb] hover:underline",
        className
      )}
    >
      {label}
    </Link>
  );
};
