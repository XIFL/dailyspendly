// Plain config object so drizzle-kit can load it without resolving the "drizzle-kit" package itself.
export default {
  dialect: "postgresql",
  schema: "./db/schema.ts",
  out: "netlify/database/migrations",
};
