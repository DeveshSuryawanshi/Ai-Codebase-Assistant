"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

// Size reference:
//  sm      — h-[14px]     w-[24px]   thumb: 12px
//  default — h-[18.4px]   w-[32px]   thumb: 16px
//  md      — h-[22px]     w-[40px]   thumb: 18px
//  lg      — h-[26px]     w-[48px]   thumb: 22px
//  xl      — h-[32px]     w-[58px]   thumb: 26px

function Switch({
  className,
  size = "default",
  checkedIcon,
  uncheckedIcon,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default" | "md" | "lg" | "xl";
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        // base
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none",
        // hit-area extender
        "after:absolute after:-inset-x-3 after:-inset-y-2",
        // focus / invalid
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
        "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        // track colours
        "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        // disabled
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",

        // ── track sizes ──
        "data-[size=sm]:h-[14px]      data-[size=sm]:w-[24px]",
        "data-[size=default]:h-[18.4px] data-[size=default]:w-[32px]",
        "data-[size=md]:h-[22px]      data-[size=md]:w-[40px]",
        "data-[size=lg]:h-[26px]      data-[size=lg]:w-[48px]",
        "data-[size=xl]:h-[32px]      data-[size=xl]:w-[58px]",

        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "group/thumb pointer-events-none relative flex items-center justify-center rounded-full bg-background ring-0 transition-transform",
          "dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",

          // ── thumb sizes ──
          "group-data-[size=sm]/switch:size-3",           // 12px
          "group-data-[size=default]/switch:size-4",      // 16px
          "group-data-[size=md]/switch:size-[18px]",
          "group-data-[size=lg]/switch:size-[22px]",
          "group-data-[size=xl]/switch:size-[26px]",

          // ── checked translate: moves thumb to the right end ──
          // calc(100% - 2px) works for all sizes because the thumb starts 1px from the left edge
          "group-data-[size=sm]/switch:data-[state=checked]:translate-x-[calc(100%-2px)]",
          "group-data-[size=default]/switch:data-[state=checked]:translate-x-[calc(100%-2px)]",
          "group-data-[size=md]/switch:data-[state=checked]:translate-x-[calc(100%-2px)]",
          "group-data-[size=lg]/switch:data-[state=checked]:translate-x-[calc(100%-2px)]",
          "group-data-[size=xl]/switch:data-[state=checked]:translate-x-[calc(100%-2px)]",

          // ── unchecked translate: rest at left edge ──
          "group-data-[size=sm]/switch:data-[state=unchecked]:translate-x-0",
          "group-data-[size=default]/switch:data-[state=unchecked]:translate-x-0",
          "group-data-[size=md]/switch:data-[state=unchecked]:translate-x-0",
          "group-data-[size=lg]/switch:data-[state=unchecked]:translate-x-0",
          "group-data-[size=xl]/switch:data-[state=unchecked]:translate-x-0",
        )}
      >
        {/* Checked icon — visible only when switch is ON */}
        {checkedIcon && (
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 opacity-0 scale-0 group-data-[state=checked]/thumb:opacity-100 group-data-[state=checked]/thumb:scale-100">
            {checkedIcon}
          </span>
        )}

        {/* Unchecked icon — visible only when switch is OFF */}
        {uncheckedIcon && (
          <span className="absolute inset-0 flex items-center justify-center transition-all duration-200 opacity-100 scale-90 group-data-[state=checked]/thumb:opacity-0 group-data-[state=checked]/thumb:scale-0 text-muted-foreground">
            {uncheckedIcon}
          </span>
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
}

export { Switch };