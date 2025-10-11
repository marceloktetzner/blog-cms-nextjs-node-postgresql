"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Breadcrumb from "./Breadcrumb";
import ThemeToggle from "../theme/ThemeToggle";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageShellProps {
  title?: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

export default function PageShell({ title, subtitle, breadcrumbs, actions, children, fullWidth = false }: PageShellProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="md:pl-64 pl-0">
        {title !== undefined && (
          <div className="border-b border-border/40 bg-background/95 backdrop-blur">
            <div className="px-4 md:px-6 py-4 md:py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    className="md:hidden rounded border border-border/50 px-2 py-1 text-sm"
                    onClick={() => setOpen(true)}
                    aria-label="Abrir menu"
                  >
                    ☰
                  </button>
                  <div className="space-y-1">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
                    {subtitle && (
                      <p className="text-sm md:text-base text-muted-foreground">{subtitle}</p>
                    )}
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2">
                  <ThemeToggle />
                  {actions}
                </div>
              </div>
            </div>
          </div>
        )}
        <main className="p-4 md:p-6">
          {fullWidth ? (
            <div className="w-full max-w-[80%] mx-auto">
              {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
              {children}
            </div>
          ) : (
            <div className="max-w-4xl">
              {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
