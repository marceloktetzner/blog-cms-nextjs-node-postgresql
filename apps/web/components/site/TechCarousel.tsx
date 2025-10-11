"use client";

import React from "react";

type Tech = {
  name: string;
  logoUrl: string;
};

const techs: Tech[] = [
  {
    name: "Next.js",
    logoUrl: "https://cdn.simpleicons.org/nextdotjs/ffffff",
  },
  {
    name: "React",
    logoUrl: "https://cdn.simpleicons.org/react/61DAFB",
  },
  {
    name: "TypeScript",
    logoUrl: "https://cdn.simpleicons.org/typescript/3178C6",
  },
  {
    name: "Tailwind CSS",
    logoUrl: "https://cdn.simpleicons.org/tailwindcss/38B2AC",
  },
  {
    name: "Node.js",
    logoUrl: "https://cdn.simpleicons.org/nodedotjs/339933",
  },
  {
    name: "Express",
    logoUrl: "https://cdn.simpleicons.org/express/ffffff",
  },
  {
    name: "PostgreSQL",
    logoUrl: "https://cdn.simpleicons.org/postgresql/4169E1",
  },
  {
    name: "Prisma",
    logoUrl: "https://cdn.simpleicons.org/prisma/2D3748",
  },
  {
    name: "JWT",
    logoUrl: "https://cdn.simpleicons.org/jsonwebtokens/000000",
  },
  {
    name: "Zod",
    logoUrl: "https://cdn.simpleicons.org/zod/3178C6",
  },
];

function TechItem({ tech }: { tech: Tech }) {
  return (
    <div className="group inline-flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground">
      <img
        src={tech.logoUrl}
        alt={tech.name}
        width={24}
        height={24}
        className="h-6 w-6 object-contain"
        loading="lazy"
        decoding="async"
      />
      <span className="font-medium">{tech.name}</span>
    </div>
  );
}

export function TechCarousel() {
  // duplicate list for seamless loop
  const items = [...techs, ...techs];

  return (
    <div className="mt-12" aria-label="Tecnologias do projeto">
      <div className="relative">
        <div className="mask-left pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent" />
        <div className="mask-right pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent" />

        <div className="overflow-hidden" role="region" aria-roledescription="carousel">
          <ul className="marquee flex min-w-max items-center gap-3 py-1 will-change-transform" aria-label="Lista de tecnologias">
            {items.map((tech, idx) => (
              <li key={`${tech.name}-${idx}`} className="shrink-0">
                <TechItem tech={tech} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          animation: marquee 28s linear infinite;
        }
        .marquee:hover,
        .marquee:focus-within {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default TechCarousel;
