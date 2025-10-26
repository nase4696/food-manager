import { Icons } from "@/components/icon";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary";
}

export function Spinner({
  className,
  size = "md",
  variant = "default",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const variantClasses = {
    default: "text-current",
    secondary: "text-muted-foreground",
  };

  return (
    <Icons.circle
      className={cn(
        "animate-spin",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    />
  );
}
