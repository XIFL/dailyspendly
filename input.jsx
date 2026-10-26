import React from "react"; import { cn } from "@/lib/utils";
export const Input=React.forwardRef(({className,type,...p},r)=><input type={type} ref={r} className={cn("flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-50",className)} {...p}/>); Input.displayName="Input";
