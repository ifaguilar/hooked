import type { Config, Context } from "@netlify/edge-functions";

/**
 * Rate-limiting edge function.
 *
 * The function body intentionally does nothing — Netlify's edge
 * infrastructure enforces the `rateLimit` config *before* this code
 * ever runs. Any IP that exceeds the window limit automatically
 * receives a `429 Too Many Requests` response without the SSR function
 * (or TMDB) being invoked at all.
 *
 * Limits: 100 requests per IP per 60-second window across the whole site.
 * This is well above typical user behavior during normal browsing,
 * while still effectively mitigating automated or abusive traffic.
 */
export default async (_req: Request, _ctx: Context) => {
  // Pass through — enforcement happens at the platform level.
};

export const config: Config = {
  path: "/*",
  rateLimit: {
    windowLimit: 100,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
    action: "rate_limit", // returns 429 Too Many Requests
  },
};
