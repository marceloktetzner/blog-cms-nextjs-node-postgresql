import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-xl font-bold tracking-tight">Lorem ipsum</div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/home" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Início
            </Link>
            <Link href="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Sobre
            </Link>
          </nav>

          <Link href="/login" className="inline-flex items-center justify-center rounded border border-border/50 px-3 py-2 text-sm transition-colors hover:border-accent/50">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
