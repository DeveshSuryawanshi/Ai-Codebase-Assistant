"use client";

import React from "react";
import { cn } from "@/lib/utils";
import MessagesList from "./messages-list";
import ChatComposer from "./chat-composer";
import { Message } from "../../types";

export default function MainChat() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full min-h-screen flex-col bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_88%,var(--muted))_0%,var(--background)_26%,var(--background)_100%)]">
      {/* Messages */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <MessagesList messages={messages} />
      </div>

      {/* Composer wrapper (moves) */}
      <div
        className={cn(
          "w-full px-3 sm:px-5 transition-all duration-300",
          hasMessages
            ? "sticky bottom-0 border-t border-border/70 bg-background/90 pb-3 pt-3 backdrop-blur sm:pb-5"
            : "flex flex-1 items-center justify-center",
        )}
      >
        {!hasMessages && (
          <div className="absolute top-1/3 w-full text-center">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-4xl">
              Start a conversation with your codebase
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Ask for explanations, reviews, refactors, or debugging help.
            </p>
          </div>
        )}

        <div
          className={cn(
            "mx-auto w-full",
            hasMessages ? "max-w-3xl" : "max-w-4xl",
          )}
        >
          <ChatComposer setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
}
