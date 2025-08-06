import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  label?: string;
  variant?: "primary" | "secondary" | "survival";
  size?: "sm" | "default" | "lg";
}

export const ProgressBar = ({ 
  value, 
  max = 100, 
  className, 
  showLabel = true, 
  label,
  variant = "primary",
  size = "default"
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: "h-2",
    default: "h-3",
    lg: "h-4"
  };
  
  const variantClasses = {
    primary: "progress-gradient",
    secondary: "secondary-gradient", 
    survival: "bg-gradient-to-r from-primary to-accent"
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            {label || "Progreso"}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={cn(
        "bg-muted rounded-full overflow-hidden",
        sizeClasses[size]
      )}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700 ease-out relative",
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        </div>
      </div>
    </div>
  );
};