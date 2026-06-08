/**
 * src/lib/rateLimiter.ts
 *
 * Simple in-memory rate limiter (no external dependency).
 * Limits each IP to `maxRequests` hits within `windowMs` milliseconds.
 *
 * NOTE: This is per-process. In a multi-instance deployment use
 * Redis (e.g. @upstash/ratelimit) instead.
 */

interface Window {
  count: number;
  resetAt: number;
}

const store = new Map<string, Window>();

export interface RateLimitOptions {
  /** Max requests allowed within the window. Default: 5 */
  maxRequests?: number;
  /** Window length in milliseconds. Default: 60 000 (1 minute) */
  windowMs?: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;       // epoch ms when the window resets
}

/** Evict expired windows to prevent memory leak. */
function evict(): void {
  const now = Date.now();
  for (const [key, win] of store.entries()) {
    if (now >= win.resetAt) store.delete(key);
  }
}

export function checkRateLimit(
  ip: string,
  { maxRequests = 5, windowMs = 60_000 }: RateLimitOptions = {}
): RateLimitResult {
  evict();

  const now = Date.now();
  let win = store.get(ip);

  if (!win || now >= win.resetAt) {
    win = { count: 0, resetAt: now + windowMs };
    store.set(ip, win);
  }

  win.count++;

  const allowed   = win.count <= maxRequests;
  const remaining = Math.max(0, maxRequests - win.count);

  return { allowed, remaining, resetAt: win.resetAt };
}
