import { AlertCircle } from "lucide-react";

type PrototypeNoteProps = {
  children: React.ReactNode;
};

export function PrototypeNote({ children }: PrototypeNoteProps) {
  return (
    <div className="border-l-2 border-amber-500 bg-amber-50/50 px-4 py-3 text-sm">
      <div className="flex gap-2">
        <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
        <div className="text-amber-800">{children}</div>
      </div>
    </div>
  );
}
