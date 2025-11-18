import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Mark className="h-7 w-auto" />
      <span className="font-extrabold tracking-tight text-xl">NILE</span>
    </div>
  );
}

function Mark({ className }: { className?: string }) {
  // Abstract brand mark: two dots above, mountain/river base below
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nile-g" x1="0" x2="1" y1="1" y2="0">
          <stop offset="0%" stopColor="hsl(24 95% 50%)" />
          <stop offset="100%" stopColor="hsl(14 90% 55%)" />
        </linearGradient>
      </defs>
      <path d="M8 36c8-2 10-10 16-10s8 8 16 10v4H8v-4Z" fill="url(#nile-g)" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="36" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}
