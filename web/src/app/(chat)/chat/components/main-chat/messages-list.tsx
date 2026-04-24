"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Message } from "../../types";

export default function MessagesList({ messages }: { messages: Message[] }) {

  React.useLayoutEffect(() => {
    window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto scroll-pb-24 px-3 py-4 pb-24 sm:scroll-pb-32 sm:px-5 sm:py-5 sm:pb-32">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
        {messages.map((message) => {

          return (
            <div
              key={message.id}
              tabIndex={-1}
              aria-label={`${message.role} message`}
              className={cn(
                "flex outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[90%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%]",
                  message.role === "user"
                    ? "rounded-br-md bg-primary text-primary-foreground"
                    : "rounded-bl-md border border-border/80 bg-card",
                )}
              >
                {message.content}
              </div>
            </div>
          );
        })}
        <div aria-hidden="true" className="h-px w-full" />
        <div aria-hidden="true" className="h-px w-full" />
      </div>
    </div>
  );
}
