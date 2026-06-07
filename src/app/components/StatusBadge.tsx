type StatusBadgeProps = {
  status: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
};

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  const variants = {
    default: "bg-[#e8dcc4] text-[#4a4a4a] border-[#4f6f52]/20",
    success: "bg-[#8fbc8f]/20 text-[#1a4d2e] border-[#1a4d2e]/20",
    warning: "bg-amber-50 text-amber-800 border-amber-200",
    danger: "bg-red-50 text-red-800 border-red-200",
    info: "bg-blue-50 text-blue-800 border-blue-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs border ${variants[variant]}`}
    >
      {status}
    </span>
  );
}
