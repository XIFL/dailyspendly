import { index, numeric, pgTable, serial, text, date, timestamp } from "drizzle-orm/pg-core";

export const entries = pgTable(
  "entries",
  {
    id: serial().primaryKey(),
    userId: text("user_id").notNull(),
    date: date().notNull(),
    category: text().notNull(),
    payment: text().notNull(),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    priority: text().notNull(),
    notes: text().notNull().default(""),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("entries_user_id_idx").on(t.userId)],
);
