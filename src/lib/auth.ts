export function requireBasicAuth(): boolean {
  const header = (globalThis as any).headers?.()?.get("authorization");
  if (!header) return false;
  const [type, payload] = header.split(" ");
  if (type !== "Basic") return false;
  const decoded = Buffer.from(payload, "base64").toString();
  const [user, pass] = decoded.split(":");
  return user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS;
}
