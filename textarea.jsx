import React from "react"; import { cn } from "@/lib/utils";
export const Textarea=React.forwardRef(({className,...p},r)=><textarea ref={r} className={cn("flex min-h-20 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-400",className)} {...p}/>); Textarea.displayName="Textarea";
