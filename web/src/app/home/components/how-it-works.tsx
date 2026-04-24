import React from "react"
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  BrainCircuit,
  DatabaseZap,
  FolderGit2,
} from "lucide-react"

const steps = [
  {
    step: "Step 1",
    title: "Read & Clone Repository",
    description:
      "The system securely fetches your GitHub repository and scans the complete codebase including files, folders, and structure.",
    icon: FolderGit2,
  },
  {
    step: "Step 2",
    title: "Chunking & Vector Embedding",
    description:
      "The code is split into meaningful chunks and transformed into vector embeddings so the system can understand code semantically.",
    icon: Boxes,
  },
  {
    step: "Step 3",
    title: "Vector Search (RAG)",
    description:
      "When a question is asked, the system performs semantic search to retrieve the most relevant parts of the codebase.",
    icon: DatabaseZap,
  },
  {
    step: "Step 4",
    title: "LLM Generates Accurate Answer",
    description:
      "The retrieved code context is sent to the LLM, which generates precise, code-aware answers about the repository.",
    icon: BrainCircuit,
  },
]

function HowItWorks() {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* <div className="absolute inset-x-0 top-16 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-primary/8 blur-3xl" /> */}

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6">
        <div className="max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-border/70 bg-background/75 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase shadow-sm backdrop-blur">
            Process Overview
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            How <span className="text-primary">Repozy</span> Works
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            From repository to intelligent answers in four simple steps
          </p>
        </div>

        <div className="mt-16 flex w-full flex-col items-stretch justify-center gap-4 lg:flex-row lg:items-stretch lg:gap-4">
          {steps.map(({ step, title, description, icon: Icon }, index) => (
            <React.Fragment key={step}>
              <article className="relative flex h-84 w-full flex-1 basis-0 flex-col rounded-[2rem] border border-border/70 bg-card/85 p-6 shadow-[0_18px_60px_-30px_rgba(0,0,0,0.4)] backdrop-blur transition-transform duration-300 sm:h-88 lg:h-105 hover:scale-[1.02]">
                <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                    {step}
                  </span>
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary shadow-sm">
                    <Icon className="size-6" />
                  </div>
                </div>

                <div className="mt-8 flex flex-1 flex-col">
                  <h3 className="min-h-16 text-2xl font-semibold tracking-tight text-balance">
                    {title}
                  </h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                    {description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1.5 w-16 rounded-full bg-primary/40" />
                  <div className="h-px flex-1 bg-border/80" />
                </div>
              </article>

              {index < steps.length - 1 && (
                <div className="flex items-center justify-center py-1 text-primary/80 lg:w-10 lg:flex-none">
                  <div className="flex flex-col items-center justify-center gap-2 lg:hidden">
                    <div className="h-6 w-px bg-border" />
                    <div className="flex items-center justify-center rounded-full border border-border/70 bg-background/80 p-2 shadow-sm">
                      <ArrowDown className="size-5" />
                    </div>
                    <div className="h-6 w-px bg-border" />
                  </div>

                  <div className="hidden items-center justify-center gap-2 lg:flex">
                    <div className="h-px w-5 bg-border" />
                    <div className="flex items-center justify-center rounded-full border border-border/70 bg-background/80 p-2 shadow-sm">
                      <ArrowRight className="size-5" />
                    </div>
                    <div className="h-px w-5 bg-border" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-center text-base leading-7 text-muted-foreground sm:text-lg">
          This pipeline allows the AI to understand your entire codebase like a
          senior engineer.
        </p>
      </div>
    </section>
  )
}

export default HowItWorks
