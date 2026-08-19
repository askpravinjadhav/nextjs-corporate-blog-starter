import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const articleGridClass =
  "grid sm:grid-cols-2 lg:grid-cols-3";

export const articleGridCellClass =
  "border-t border-b border-neutral-200 p-4 sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:border-r lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0";

export const ArticleGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(articleGridClass, className)}>{children}</div>
  );
};
