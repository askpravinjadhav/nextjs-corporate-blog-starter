"use client";

import { config } from "@/config";
import { cn } from "@/lib/utils";
import { Bookmark, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, Suspense, useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Latest", href: "/" },
  ...config.categories.map((category) => ({
    label: category.label,
    href: `/category/${category.tag}`,
  })),
];

const SiteHeaderInner = () => {
  const pathname = usePathname();
  const param = useSearchParams();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(Boolean(param.get("query")));
  const [searchText, setSearchText] = useState(param.get("query") || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const onHandleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchText === "") {
        router.push("/");
      } else {
        router.push(`/?query=${encodeURIComponent(searchText)}`);
      }
      setSearchOpen(false);
    }
    if (e.key === "Escape") {
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="shrink-0 text-neutral-800"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="shrink-0 whitespace-nowrap text-base leading-none tracking-tight text-black">
          <span className="font-light">PRODUCT</span>{" "}
          <span className="font-bold">WIRE</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] tracking-wide text-neutral-700 hover:text-black",
                  active && "font-semibold text-black"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link href="/saved" aria-label="Saved articles">
            <Bookmark className="h-4 w-4" />
          </Link>
          {searchOpen ? (
            <div className="flex items-center border border-neutral-200 px-2">
              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search"
                className="w-36 bg-transparent py-1 text-[11px] outline-none sm:w-48"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={onHandleKey}
              />
              <button
                type="button"
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-neutral-200 px-4 py-3">
          <div className="mx-auto flex max-w-7xl flex-col gap-2.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] tracking-wide"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export const SiteHeader = () => {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 h-14 border-b border-neutral-200 bg-white" />
      }
    >
      <SiteHeaderInner />
    </Suspense>
  );
};
