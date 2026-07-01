import { AlertCircle, CheckCircle2, Clock3, Info, XCircle } from "lucide-react";

type StatusBadgeProps = {
  status: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
};

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  const variants = {
    default: "bg-[#f4f1e8] text-[#4a4a4a] border-[#4f6f52]/20",
    success: "bg-emerald-50 text-[#1a4d2e] border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  const icons = {
    default: Info,
    success: CheckCircle2,
    warning: Clock3,
    danger: XCircle,
    info: AlertCircle,
  };
  const Icon = icons[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs border ${variants[variant]}`}
      aria-label={`Status: ${status}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {status}
    </span>
  );
}
