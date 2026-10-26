import React from "react"; import * as LabelPrimitive from "@radix-ui/react-label"; import { cn } from "@/lib/utils";
export const Label=React.forwardRef(({className,...p},r)=><LabelPrimitive.Root ref={r} className={cn("text-sm font-medium leading-none",className)} {...p}/>); Label.displayName="Label";
