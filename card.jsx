import React from "react"; import { cn } from "@/lib/utils";
export const Card=React.forwardRef(({className,...p},r)=><div ref={r} className={cn("rounded-xl border bg-white",className)} {...p}/>); Card.displayName="Card";
export const CardHeader=React.forwardRef(({className,...p},r)=><div ref={r} className={cn("flex flex-col space-y-1.5 p-6",className)} {...p}/>); CardHeader.displayName="CardHeader";
export const CardTitle=React.forwardRef(({className,...p},r)=><h3 ref={r} className={cn("font-semibold leading-none tracking-tight",className)} {...p}/>); CardTitle.displayName="CardTitle";
export const CardContent=React.forwardRef(({className,...p},r)=><div ref={r} className={cn("p-6 pt-0",className)} {...p}/>); CardContent.displayName="CardContent";
