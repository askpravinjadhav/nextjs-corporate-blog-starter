"use client";

import { config } from "@/config";
import { infographicSections } from "@/lib/infographics";
import { getCategoryHref } from "@/lib/postCategory";
import { cn } from "@/lib/utils";
import { Bookmark, ChevronDown, Menu, Search, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { KeyboardEvent, Suspense, useEffect, useRef, useState } from "react";

const infographicSubLinkClass =
  "text-[11px] tracking-wide text-neutral-500 hover:text-black";

const navItems = [
  { label: "Latest", href: "/" },
  ...config.categories.map((category) => ({
    label: category.label,
    href: getCategoryHref(category.tag),
  })),
  { label: "About", href: "/about" },
];

const SiteHeaderInner = () => {
  const pathname = usePathname();
  const param = useSearchParams();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(Boolean(param.get("query")));
  const [searchText, setSearchText] = useState(param.get("query") || "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [infographicsHover, setInfographicsHover] = useState(false);
  const [infographicsMenuOpen, setInfographicsMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const burgerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    setInfographicsHover(false);
    setInfographicsMenuOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onPointerDown = (event: PointerEvent) => {
      if (!burgerRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
        setInfographicsMenuOpen(false);
      }
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setInfographicsMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

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
      <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5">
        <div className="flex h-8 items-center gap-2.5">
          <div ref={burgerRef} className="relative flex h-8 items-center">
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((open) => !open);
                setInfographicsMenuOpen(false);
              }}
              className="inline-flex h-8 w-8 items-center justify-center text-neutral-800"
            >
              {menuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            {menuOpen && (
              <nav className="absolute left-0 top-full z-50 mt-2.5 w-52 border border-neutral-200 bg-white py-2">
              {navItems.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                if (item.href === "/infographics") {
                  return (
                    <div key={item.href} className="px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <Link
                          href={item.href}
                          className={cn(
                            "text-[11px] tracking-wide",
                            active && "font-semibold"
                          )}
                          onClick={() => setMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          className="p-0.5 text-neutral-500"
                          aria-label="Show Infographics sections"
                          aria-expanded={infographicsMenuOpen}
                          onClick={() =>
                            setInfographicsMenuOpen((open) => !open)
                          }
                        >
                          <ChevronDown
                            className={cn(
                              "h-3 w-3 transition-transform",
                              infographicsMenuOpen && "rotate-180"
                            )}
                          />
                        </button>
                      </div>
                      {infographicsMenuOpen && (
                        <div className="mt-2 flex flex-col gap-1.5 pl-2">
                          {infographicSections.map((section) => (
                            <Link
                              key={section.slug}
                              href={section.href}
                              className={infographicSubLinkClass}
                              onClick={() => setMenuOpen(false)}
                            >
                              {section.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block px-3 py-1.5 text-[11px] tracking-wide",
                      active && "font-semibold"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            )}
          </div>

          <Link
            href="/"
            className="inline-flex h-8 items-center whitespace-nowrap text-base leading-none tracking-tight text-black"
          >
            <span className="font-light">PRODUCT</span>
            <span className="ml-[0.3em] font-bold">WIRE</span>
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-4 xl:gap-5 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const linkClass = cn(
              "inline-flex h-8 items-center whitespace-nowrap text-[11px] tracking-wide text-neutral-700 hover:text-black",
              active && "font-semibold text-black"
            );
            if (item.href === "/infographics") {
              return (
                <div
                  key={item.href}
                  className="relative inline-flex h-8 items-center"
                  onMouseEnter={() => setInfographicsHover(true)}
                  onMouseLeave={() => setInfographicsHover(false)}
                >
                  <Link
                    href={item.href}
                    className={cn(linkClass, "gap-1")}
                    aria-haspopup="true"
                    aria-expanded={infographicsHover}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 shrink-0 text-neutral-500 transition-transform",
                        infographicsHover && "rotate-180 text-black"
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                  {infographicsHover && (
                    <div className="absolute left-0 top-full z-50 pt-2.5">
                      <div className="w-52 border border-neutral-200 bg-white py-2">
                        <div className="px-3 py-1.5">
                          <div className="flex flex-col gap-1.5 pl-2">
                            {infographicSections.map((section) => (
                              <Link
                                key={section.slug}
                                href={section.href}
                                className={infographicSubLinkClass}
                              >
                                {section.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <ThemeToggle />
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
