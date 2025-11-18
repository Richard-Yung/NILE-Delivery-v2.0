import { cn } from "@/lib/utils";
import { Bike, Car } from "lucide-react";
import type { SVGProps } from "react";

export function MotoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-4 w-4", className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="17" r="3" />
      <path d="M7 17l4-7h4l3 4" />
      <path d="M10 10l-2-2" />
      <path d="M14 10l2-3" />
    </svg>
  );
}

export function CarIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <Car className={cn("h-4 w-4", className)} aria-hidden="true" {...(props as any)} />;
}

export function BikeIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return <Bike className={cn("h-4 w-4", className)} aria-hidden="true" {...(props as any)} />;
}
