import type { Config, Context } from "@netlify/functions";
import { getUser } from "@netlify/identity";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { entries } from "../../db/schema.js";

const CATEGORIES = ["Food", "Transportation", "Housing", "Entertainment", "Shopping", "Health", "Education", "Bills", "Other"];
const PAYMENT_METHODS = ["Cash", "Debit", "Credit"];
const PRIORITIES = ["Need", "Want"];

type Row = typeof entries.$inferSelect;
const toEntry = (r: Row) => ({
  id: r.id,
  date: r.date,
  category: r.category,
  payment: r.payment,
  amount: Number(r.amount),
  priority: r.priority,
  notes: r.notes,
});

export default async (req: Request, context: Context) => {
  // On Deploy Previews only, fall back to a shared test user so login can be bypassed for testing.
  const user =
    (await getUser()) ??
    (context.deploy.context === "deploy-preview" ? { id: "preview-test-user" } : null);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  if (req.method === "GET") {
    const rows = await db
      .select()
      .from(entries)
      .where(eq(entries.userId, user.id))
      .orderBy(desc(entries.date), desc(entries.id));
    return Response.json(rows.map(toEntry));
  }

  if (req.method === "POST") {
    const body = await req.json().catch(() => null);
    const amount = Number(body?.amount);
    const notes = typeof body?.notes === "string" ? body.notes.trim().slice(0, 250) : "";
    if (
      typeof body?.date !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(body.date) ||
      !CATEGORIES.includes(body.category) ||
      !PAYMENT_METHODS.includes(body.payment) ||
      !PRIORITIES.includes(body.priority) ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      amount >= 1e10
    ) {
      return Response.json({ error: "Invalid entry." }, { status: 400 });
    }
    const [row] = await db
      .insert(entries)
      .values({
        userId: user.id,
        date: body.date,
        category: body.category,
        payment: body.payment,
        amount: amount.toFixed(2),
        priority: body.priority,
        notes,
      })
      .returning();
    return Response.json(toEntry(row), { status: 201 });
  }

  if (req.method === "DELETE") {
    const id = Number(context.params.id);
    if (!Number.isInteger(id)) return Response.json({ error: "Invalid id." }, { status: 400 });
    const deleted = await db
      .delete(entries)
      .where(and(eq(entries.id, id), eq(entries.userId, user.id)))
      .returning({ id: entries.id });
    if (!deleted.length) return Response.json({ error: "Not found." }, { status: 404 });
    return new Response(null, { status: 204 });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: ["/api/entries", "/api/entries/:id"],
};
