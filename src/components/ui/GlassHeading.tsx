import React from "react";
import { cn } from "@/lib/utils";
import type { BaseProps } from "@/types/glass.types";
import { glassAnimations } from "@/styles/glass";

interface GlassHeadingProps
  extends BaseProps,
    Omit<React.HTMLAttributes<HTMLHeadingElement>, "className"> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// GlassHeading Component
export const GlassHeading: React.FC<GlassHeadingProps> = ({
  children,
  level = 1,
  className = "",
  ...props
}) => {
  const Component = `h${level}` as keyof React.JSX.IntrinsicElements;

  const sizes: Record<NonNullable<GlassHeadingProps["level"]>, string> = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold",
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-medium",
    6: "text-base font-medium",
  };

  return React.createElement(
    Component,
    {
      className: cn(
        "text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300",
        sizes[level],
        glassAnimations.hoverSubtle,
        className,
      ),
      ...props,
    },
    children,
  );
};
