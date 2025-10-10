export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Lorem ipsum dolor sit amet.{' '}
          <span className="text-muted-foreground">Consectetur adipiscing elit sed do.</span>
        </h1>

        <p className="mt-8 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
          dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
        </p>

        <div className="mt-12 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span>Lorem ipsum dolor</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <span>Sit amet consectetur</span>
          </div>
        </div>
      </div>
    </section>
  );
}
