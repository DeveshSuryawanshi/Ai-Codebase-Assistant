import React from "react";
import { BadgeCheck, BrainCircuit, Clock3, GitBranch } from "lucide-react";

function Header() {
  const highlights = [
    {
      icon: GitBranch,
      title: "GitHub or GitLab",
      description: "Drop in a repository URL and start from the source of truth.",
    },
    {
      icon: BrainCircuit,
      title: "Semantic code understanding",
      description: "Prepare your repo for smarter, context-aware answers.",
    },
    {
      icon: Clock3,
      title: "Fast onboarding",
      description: "Turn unfamiliar codebases into something searchable and clear.",
    },
  ];

  return (
    <section className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm shadow-sm backdrop-blur">
        <BadgeCheck className="size-4 text-primary" />
        Repository indexing workspace
      </div>

      <div className="mt-6 space-y-5">
        <h1 className="max-w-xl text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Turn any repository into an AI-ready knowledge base.
        </h1>

        <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
          Paste a GitHub or GitLab URL and let Repozy map the structure,
          relationships, and code context before you start asking questions.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/70 bg-background/75 p-4 shadow-sm backdrop-blur"
          >
            <div className="mb-3 flex size-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Icon className="size-5" />
            </div>
            <h2 className="text-sm font-semibold">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Header;
