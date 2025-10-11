"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const nav = [
    { href: "/dashboard?tab=posts", label: "Meus Posts" },
    { href: "/create-post", label: "Criar Post" },
    { href: "/profile", label: "Perfil" },
  ];

  return (
    <>
      {/* Backdrop mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 border-r border-border/40 bg-card/60 backdrop-blur transition-transform md:translate-x-0 
        ${open ? 'translate-x-0' : '-translate-x-full'} md:fixed md:inset-y-0 md:left-0`}
        role="navigation"
        aria-label="Sidebar"
      >
        <div className="h-16 flex items-center px-4 border-b border-border/40 justify-between">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Lorem ipsum
          </Link>
          <button
            className="md:hidden text-sm text-muted-foreground hover:text-foreground"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href.includes("?tab=posts") && pathname === "/dashboard");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition-all duration-150 border-l-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:border-primary"
                }`}
                onClick={onClose}
              >
                {/* Icone */}
                {item.href.includes('tab=posts') && (
                  <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z"/></svg>
                )}
                {item.href === '/create-post' && (
                  <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0L14.13 4.1l3.75 3.75 2.83-2.81z"/></svg>
                )}
                {item.href === '/profile' && (
                  <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/></svg>
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => {
              if (typeof window !== "undefined") localStorage.removeItem("token");
              router.push("/");
              onClose?.();
            }}
            className="w-full text-left flex items-center rounded px-3 py-2 text-sm text-destructive/90 hover:text-destructive transition-all duration-150 border-l-2 border-transparent hover:border-destructive/60 hover:bg-destructive/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30"
          >
            Sair
          </button>
        </nav>
      </aside>
    </>
  );
}
