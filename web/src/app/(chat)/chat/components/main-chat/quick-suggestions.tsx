export default function QuickSuggestions({
  setDraft,
}: {
  setDraft: (text: string) => void;
}) {
  const suggestions = [
    "Explain this codebase structure",
    "Review this file for bugs",
    "Find duplicated logic",
    "Suggest a refactor",
  ];

  return (
    <div className="flex justify-center gap-2 overflow-x-auto pb-1">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => setDraft(s)}
          className="shrink-0 rounded-full border border-border/70 bg-card px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
        >
          {s}
        </button>
      ))}
    </div>
  );
}