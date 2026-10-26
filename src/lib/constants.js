export const CATEGORIES = ["Food", "Transportation", "Housing", "Entertainment", "Shopping", "Health", "Education", "Bills", "Other"];

export const PAYMENT_METHODS = ["Cash", "Debit", "Credit"];

export const CATEGORY_STYLES = {
  Food: "bg-orange-100 text-orange-700",
  Transportation: "bg-blue-100 text-blue-700",
  Housing: "bg-violet-100 text-violet-700",
  Entertainment: "bg-pink-100 text-pink-700",
  Shopping: "bg-cyan-100 text-cyan-700",
  Health: "bg-emerald-100 text-emerald-700",
  Education: "bg-indigo-100 text-indigo-700",
  Bills: "bg-amber-100 text-amber-700",
  Other: "bg-slate-100 text-slate-700",
};

export const TIME_PERIODS = [
  { value: "all", label: "All time" },
  { value: "week", label: "This week" },
  { value: "month", label: "This month" },
  { value: "30days", label: "Last 30 days" },
];

export const money = new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" });
