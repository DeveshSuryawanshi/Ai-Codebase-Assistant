"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleCredentialsSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    if (mode === "signup") {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message ?? "Unable to create your account.");
        setIsPending(false);
        return;
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/chat",
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password.");
      setIsPending(false);
      return;
    }

    window.location.href = result?.url ?? "/chat";
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-normal">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to continue to Repozy."
              : "Start with email or use an OAuth provider."}
          </p>
        </div>

        <form className="space-y-3" onSubmit={handleCredentialsSubmit}>
          {mode === "signup" ? (
            <Input name="name" placeholder="Name" autoComplete="name" required />
          ) : null}
          <Input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            minLength={8}
            required
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" disabled={isPending} type="submit">
            {isPending
              ? "Please wait"
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <div className="grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("github", { callbackUrl: "/chat" })}
          >
            GitHub
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => signIn("google", { callbackUrl: "/chat" })}
          >
            Google
          </Button>
        </div>

        <Button
          className="px-0"
          type="button"
          variant="link"
          onClick={() => {
            setError(null);
            setMode((currentMode) =>
              currentMode === "login" ? "signup" : "login"
            );
          }}
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Sign in"}
        </Button>
      </div>
    </main>
  );
}
