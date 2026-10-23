import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva("inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:pointer-events-none disabled:opacity-50", { variants: { variant: { default: "bg-slate-900 text-white hover:bg-slate-800", ghost: "hover:bg-slate-100", outline: "border border-slate-200 bg-white hover:bg-slate-50" }, size: { default: "h-10 px-4 py-2" } }, defaultVariants: { variant: "default", size: "default" } });
export const Button = React.forwardRef(({ className, variant, size, asChild=false, ...props }, ref) => { const Comp=asChild?Slot:"button"; return <Comp ref={ref} className={cn(buttonVariants({variant,size}),className)} {...props}/>; });
Button.displayName="Button";
