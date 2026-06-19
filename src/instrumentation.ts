/**
 * Runs once when the Node server boots. This network resolves Supabase to
 * NAT64 IPv6 addresses that aren't routable here, so undici/fetch stalls on
 * them before falling back. Prefer IPv4 to avoid the connect timeout.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const dns = await import("node:dns");
    dns.setDefaultResultOrder("ipv4first");
  }
}
