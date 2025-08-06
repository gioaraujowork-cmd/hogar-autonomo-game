import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GameCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "survival" | "challenge" | "achievement";
  interactive?: boolean;
  onClick?: () => void;
}

export const GameCard = ({ 
  children, 
  className, 
  variant = "default", 
  interactive = false,
  onClick 
}: GameCardProps) => {
  const variantClasses = {
    default: "survival-card",
    survival: "survival-card border-primary/30 bg-gradient-to-br from-background to-primary/5",
    challenge: "survival-card border-warning/30 bg-gradient-to-br from-background to-warning/5",
    achievement: "survival-card border-success/30 bg-gradient-to-br from-background to-success/5 glow-effect"
  };

  return (
    <div
      className={cn(
        variantClasses[variant],
        interactive && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};