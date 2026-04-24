import { X } from "lucide-react";

export default function AttachedFilesBar({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}) {
  if (!files.length) return null;

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {files.map((file, i) => (
        <div
          key={i}
          className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-3 py-1.5 text-sm"
        >
          <span className="truncate max-w-40">{file.name}</span>
          <button onClick={() => setFiles((f) => f.filter((_, x) => x !== i))}>
            <X className="size-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}