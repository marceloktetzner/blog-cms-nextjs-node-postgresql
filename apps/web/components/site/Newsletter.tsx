export function Newsletter() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Lorem ipsum dolor</h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
            dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
          </p>

          <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              placeholder="email@exemplo.com"
              required
              className="sm:w-80 w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded border border-border/50 px-5 py-3 text-base transition-all hover:text-blue-600 dark:hover:text-red-400 hover:border-blue-500 dark:hover:border-red-500 hover:-translate-y-0.5"
            >
              Enviar
            </button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </section>
  );
}
