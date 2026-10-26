import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({ title, value, detail, icon: Icon, iconClass }) {
  return (
    <motion.div className="h-full min-w-0" whileHover={{ y: -3 }}>
      <Card className="h-full rounded-2xl border-0 bg-white shadow-sm ring-1 ring-slate-200/70">
        <CardContent className="flex h-full min-h-36 items-start justify-between gap-4 p-5">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <p className="mt-2 truncate text-2xl font-bold text-slate-900 tabular-nums">{value}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{detail}</p>
          </div>
          <div className={`shrink-0 rounded-2xl p-3 ${iconClass}`}>
            <Icon className="h-5 w-5" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
