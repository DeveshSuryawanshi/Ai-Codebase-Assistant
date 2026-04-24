"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowUpRight,
  CheckCircle2,
  FolderGit2,
  LoaderCircle,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from "next/navigation"

function RepoIndexingInput() {
  const [repoUrl, setRepoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageTone, setMessageTone] = useState<"success" | "error" | null>(null)
  const router = useRouter();

  const examples = [
    "https://github.com/vercel/next.js",
    "https://gitlab.com/example/team/project",
  ]

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    if (!repoUrl.trim()) return

    try {
      setLoading(true)
      setMessage(null)
      setMessageTone(null)

      const res = await fetch("/api/index-repo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl: repoUrl.trim() }),
      })

      if (!res.ok) {
        throw new Error("Failed to index repository")
      }

      setMessage("Repository indexing started successfully.")
      setMessageTone("success")
      setRepoUrl("")
    } catch (error: unknown) {
      setMessage((error as Error).message || "Something went wrong")
      setMessageTone("error")
    } finally {
      setLoading(false)
      router.push("/chat");
    }
  }

  return (
    <Card className="w-full max-w-xl rounded-[2rem] border-border/70 bg-background/85 py-0 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.28)] backdrop-blur">
      <CardHeader className="border-b border-border/70 px-6 py-6 sm:px-7">
        <div className="mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
          <FolderGit2 className="size-6" />
        </div>
        <CardTitle className="text-2xl font-semibold sm:text-3xl">
          Start indexing
        </CardTitle>
        <CardDescription className="max-w-lg text-sm leading-6 sm:text-base">
          Add your repository link below. We&apos;ll begin preparing it for
          code-aware search and AI conversations.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-6 sm:px-7">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="repo-url" className="text-sm font-medium">
              Repository URL
            </label>
            <div className="relative">
              <Input
                id="repo-url"
                placeholder="https://github.com/user/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="h-14 rounded-2xl border-border/70 bg-muted/30 pl-4 pr-12 text-base shadow-none md:text-base mt-3"
              />
              <ArrowUpRight className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Public GitHub and GitLab repository URLs work best here.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setRepoUrl(example)}
                className="rounded-full border border-border/70 bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {example}
              </button>
            ))}
          </div>

          <Button
            className="h-12 w-full rounded-2xl text-base font-semibold shadow-lg shadow-primary/20"
            type="submit"
            disabled={loading || !repoUrl.trim()}
          >
            {loading ? (
              <>
                <LoaderCircle className="size-5 animate-spin" />
                Indexing repository
              </>
            ) : (
              <>
                <Sparkles className="size-5" />
                Start Indexing
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col items-start gap-3 border-t border-border/70 bg-muted/35 px-6 py-5 sm:px-7">
        <div className="flex items-start gap-3 text-sm">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="leading-6 text-muted-foreground">
            Once indexed, you can ask Repozy architecture questions, trace logic
            faster, and onboard into unfamiliar code with less digging.
          </p>
        </div>

        {message && (
          <p
            className={
              messageTone === "error"
                ? "text-sm font-medium text-destructive"
                : "text-sm font-medium text-primary"
            }
          >
            {message}
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

export default RepoIndexingInput
