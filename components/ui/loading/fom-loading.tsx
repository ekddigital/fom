import { FomLogo } from "@/components/ui/branding/fom-logo";
import { cn } from "@/lib/utils";

interface FomLoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "splash";
  message?: string;
  className?: string;
}

export function FomLoading({
  size = "md",
  variant = "default",
  message = "Loading...",
  className = "",
}: FomLoadingProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  if (variant === "splash") {
    return (
      <div className={cn(
        "fixed inset-0 bg-dark-elevated flex items-center justify-center z-50",
        className
      )}>
        {/* Background Effects */}
        <div className="absolute inset-0 bg-fom-primary-gradient-radial opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        
        {/* Animated elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-fom-secondary/10 rounded-full blur-3xl animate-fom-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-fom-primary/10 rounded-full blur-3xl animate-fom-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 text-center space-y-8">
          <div className="animate-fom-pulse">
            <FomLogo size="lg" showText={true} textPosition="bottom" />
          </div>
          
          {/* Loading spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-fom-primary/20 rounded-full mx-auto"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 border-4 border-transparent border-t-fom-secondary rounded-full animate-spin"></div>
          </div>
          
          <p className="text-xl text-fom-glow font-semibold animate-fom-pulse">
            {message}
          </p>
        </div>
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn(
          "border-4 border-fom-primary/20 border-t-fom-secondary rounded-full animate-spin",
          sizeClasses[size]
        )}></div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={cn(
      "flex flex-col items-center justify-center space-y-6 py-12",
      className
    )}>
      <div className="relative">
        <div className="w-20 h-20 border-4 border-fom-primary-glass rounded-full"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-fom-secondary border-r-fom-primary rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-b-fom-accent border-l-fom-light-blue rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      <div className="text-center space-y-2">
        <p className="text-lg text-fom-emphasis font-semibold animate-fom-pulse">
          {message}
        </p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-fom-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-fom-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-fom-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
