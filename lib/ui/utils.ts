import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Enhanced cn function with better TypeScript support
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Color utility functions for FOM theme
export function getFomColorVar(color: string): string {
  const colorMap: Record<string, string> = {
    "fom-primary": "var(--fom-primary)",
    "fom-secondary": "var(--fom-secondary)",
    "fom-accent": "var(--fom-accent)",
    "fom-gradient": "var(--fom-gradient)",
  };
  return colorMap[color] || color;
}

// Responsive utility for different screen sizes
export function responsive(options: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}): string {
  const classes = [];
  if (options.base) classes.push(options.base);
  if (options.sm) classes.push(`sm:${options.sm}`);
  if (options.md) classes.push(`md:${options.md}`);
  if (options.lg) classes.push(`lg:${options.lg}`);
  if (options.xl) classes.push(`xl:${options.xl}`);
  return classes.join(" ");
}

// Focus visible utility with FOM theme
export function focusRing(variant: "default" | "fom" = "default"): string {
  if (variant === "fom") {
    return "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fom-primary focus-visible:ring-offset-2";
  }
  return "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
}

// Animation utilities
export function fadeIn(delay: number = 0): string {
  return `animate-in fade-in duration-500 delay-${delay}`;
}

export function slideUp(delay: number = 0): string {
  return `animate-in slide-in-from-bottom-4 duration-500 delay-${delay}`;
}

// Text truncation with different variants
export function truncate(
  variant: "default" | "multiline" = "default",
  lines?: number
): string {
  if (variant === "multiline" && lines) {
    return `overflow-hidden text-ellipsis line-clamp-${lines}`;
  }
  return "truncate";
}

// Container utility with FOM max-widths
export function container(
  size: "sm" | "md" | "lg" | "xl" | "full" = "xl"
): string {
  const sizeMap = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
    full: "max-w-full",
  };
  return `mx-auto px-4 sm:px-6 lg:px-8 ${sizeMap[size]}`;
}
