import { useEffect, useState } from "react";
import { api } from "@/lib/api";

// Loads, adds and deletes the signed-in user's purchases.
// `onLogout` is called whenever the API answers 401 (session expired / not signed in).
export function useEntries(onLogout) {
  const [entries, setEntries] = useState([]);
  const [loadState, setLoadState] = useState("loading"); // "loading" | "ready" | "error"

  // Runs once on mount (same as before the refactor, so `onLogout` is intentionally not a dependency).
  useEffect(() => {
    let active = true;
    api("/api/entries")
      .then((data) => {
        if (active) {
          setEntries(data);
          setLoadState("ready");
        }
      })
      .catch((err) => {
        if (!active) return;
        if (err.status === 401) onLogout();
        else setLoadState("error");
      });
    return () => {
      active = false;
    };
  }, []);

  // Saves a purchase and inserts it in sorted position. Throws on failure so the caller can show an error.
  async function addEntry(payload) {
    const created = await api("/api/entries", { method: "POST", body: JSON.stringify(payload) });
    setEntries((x) => [created, ...x].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id));
    return created;
  }

  // Optimistic delete: removes the row immediately and restores it if the request fails.
  async function deleteEntry(id) {
    const prev = entries;
    setEntries((x) => x.filter((i) => i.id !== id));
    try {
      await api(`/api/entries/${id}`, { method: "DELETE" });
    } catch (err) {
      if (err.status === 401) return onLogout();
      if (err.status !== 404) {
        setEntries(prev);
        window.alert("Could not delete this purchase. Please try again.");
      }
    }
  }

  return { entries, loadState, addEntry, deleteEntry };
}
