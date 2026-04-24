import React from "react";
import { Paperclip, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttachedFilesBar from "./attached-files-bar";
import QuickSuggestions from "./quick-suggestions";
import { Message } from "../../types";

export default function ChatComposer({
  setMessages,
}: {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const [draft, setDraft] = React.useState("");
  const [files, setFiles] = React.useState<File[]>([]);
  const [smartPrompts, setSmartPrompts] = React.useState(true);

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const fileRef = React.useRef<HTMLInputElement | null>(null);
  const idRef = React.useRef(1);

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  React.useEffect(resize, [draft]);

  const send = () => {
    if (!draft.trim()) return;

    setMessages((m) => [
      ...m,
      { id: idRef.current++, role: "user", content: draft },
      {
        id: idRef.current++,
        role: "assistant",
        content: "Assistant response placeholder.",
      },
    ]);

    setDraft("");
    setFiles([]);
    scrollToBottom();
  };

  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <AttachedFilesBar files={files} setFiles={setFiles} />
      <QuickSuggestions setDraft={setDraft} />

      <div className="flex items-center gap-2 rounded-[1.75rem] border border-border/80 bg-card/95 p-2">
        <input
          ref={fileRef}
          type="file"
          multiple
          hidden
          onChange={(e) =>
            setFiles((f) => [...f, ...(Array.from(e.target.files ?? []))])
          }
        />

        <Button size="icon" variant="ghost" onClick={() => fileRef.current?.click()}>
          <Paperclip className="size-4" />
        </Button>

        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          rows={1}
          placeholder="Ask about the codebase..."
          className="max-h-36 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 outline-none"
        />

        <Button
          size="sm"
          variant={smartPrompts ? "secondary" : "ghost"}
          onClick={() => setSmartPrompts((s) => !s)}
        >
          <Sparkles className="size-4" />
        </Button>

        <Button size="icon" onClick={send} disabled={!draft.trim()}>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}