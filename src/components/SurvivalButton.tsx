import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const survivalButtonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "primary-gradient text-primary-foreground hover:scale-105 hover:glow-effect shadow-md",
        secondary: "secondary-gradient text-secondary-foreground hover:scale-105 hover:shadow-lg",
        success: "bg-success text-success-foreground hover:bg-success/90 hover:scale-105",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:scale-105",
        outline: "border-2 border-primary bg-transparent text-primary hover:primary-gradient hover:text-primary-foreground hover:scale-105",
        ghost: "text-primary hover:bg-primary/10 hover:scale-105",
        survival: "survival-gradient border border-primary/20 text-foreground hover:glow-effect hover:scale-105 survival-shadow"
      },
      size: {
        sm: "h-9 px-3 text-xs",
        default: "h-11 px-6 py-2",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface SurvivalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof survivalButtonVariants> {}

const SurvivalButton = forwardRef<HTMLButtonElement, SurvivalButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(survivalButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

SurvivalButton.displayName = "SurvivalButton";

export { SurvivalButton, survivalButtonVariants };