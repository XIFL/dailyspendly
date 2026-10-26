// Small fetch wrapper: sends/receives JSON, and throws an Error with `.status` set on non-2xx responses.
export async function api(path, options = {}) {
  const res = await fetch(path, {
    ...options,
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.error || "Request failed");
    err.status = res.status;
    throw err;
  }
  return res.status === 204 ? null : res.json();
}
