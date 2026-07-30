import { cn } from "@/lib/utils";

type BadgeGroupProps = {
  items: string[];
  className?: string;
  variant?: "default" | "sage";
};

export function BadgeGroup({
  items,
  className,
  variant = "default",
}: BadgeGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <span
          key={item}
          className={cn(
            "rounded-full border px-3 py-1 text-xs",
            variant === "sage"
              ? "border-sage/20 bg-sage/10 text-sage"
              : "border-border bg-muted/40 text-muted-foreground",
          )}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
