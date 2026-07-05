import type { Config, Context } from "@netlify/edge-functions";

/**
 * Known bot / scanner User-Agent patterns.
 *
 * Sourced from common attack tools, vulnerability scanners, and HTTP
 * libraries that are frequently used in automated abuse. Real browsers
 * never send these strings.
 */
const BOT_UA_PATTERNS: RegExp[] = [
  // Generic HTTP libraries (never used by real browsers)
  /python-requests/i,
  /python-urllib/i,
  /go-http-client/i,
  /java\/\d/i,
  /okhttp/i,
  /axios/i,
  /node-fetch/i,
  /got\//i,
  /undici/i,

  // CLI tools
  /curl\//i,
  /wget\//i,
  /httpie/i,

  // Vulnerability / port scanners
  /masscan/i,
  /zgrab/i,
  /nmap/i,
  /nuclei/i,
  /nikto/i,
  /dirbuster/i,
  /sqlmap/i,

  // Scrapers and crawlers (non-search-engine)
  /scrapy/i,
  /httrack/i,
  /libwww-perl/i,
  /lwp-trivial/i,

  // Generic "bot" / "crawler" strings not belonging to legit search engines
  /\bbot\b(?!.*(?:google|bing|baidu|yandex|duckduck|semrush|ahrefsbot))/i,
];

/**
 * Legitimate search-engine bots we deliberately allow through so that
 * the site remains indexable.
 */
const ALLOWED_CRAWLERS: RegExp[] = [
  /googlebot/i,
  /bingbot/i,
  /baiduspider/i,
  /yandexbot/i,
  /duckduckbot/i,
  /slurp/i, // Yahoo
  /facebot/i,
  /twitterbot/i,
  /linkedinbot/i,
];

export default async (req: Request, _ctx: Context) => {
  const ua = req.headers.get("user-agent") ?? "";

  // 1. Allow legitimate search-engine crawlers first.
  if (ALLOWED_CRAWLERS.some((pattern) => pattern.test(ua))) {
    return; // pass through
  }

  // 2. Block empty / missing User-Agent — real browsers always send one.
  if (!ua.trim()) {
    return new Response("Forbidden", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // 3. Block known bot / scanner User-Agents.
  if (BOT_UA_PATTERNS.some((pattern) => pattern.test(ua))) {
    return new Response("Forbidden", {
      status: 403,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Pass through to the next edge function (rate-limit) or the SSR handler.
};

export const config: Config = {
  path: "/*",
};
