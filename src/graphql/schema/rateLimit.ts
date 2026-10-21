type Bucket = { failures: number; resetAt: number };
type Keys = { ip: string; username: string };

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES_PER_IP = 5;
const MAX_FAILURES_PER_USERNAME = 20;
const MAX_ENTRIES = 10000;

// One pod, so in-memory state is enough. It resets on restart, which is accepted.
const buckets = new Map<string, Bucket>();

const read = (key: string, now: number): Bucket | undefined => {
  const bucket = buckets.get(key);
  if (bucket && bucket.resetAt <= now) {
    buckets.delete(key);
    return undefined;
  }
  return bucket;
};

const bump = (key: string, now: number) => {
  const bucket = read(key, now);
  if (bucket) {
    bucket.failures += 1;
  } else {
    buckets.set(key, { failures: 1, resetAt: now + WINDOW_MS });
  }
};

const prune = (now: number) => {
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) buckets.delete(key);
  });
  const extra = buckets.size - MAX_ENTRIES;
  if (extra > 0) {
    Array.from(buckets.keys()).slice(0, extra).forEach(key => buckets.delete(key));
  }
};

export const loginLimiter = {
  isLimited({ ip, username }: Keys, now = Date.now()): boolean {
    const ipBucket = read(`ip:${ip}`, now);
    const userBucket = read(`user:${username}`, now);
    return (
      (ipBucket ? ipBucket.failures : 0) >= MAX_FAILURES_PER_IP ||
      (userBucket ? userBucket.failures : 0) >= MAX_FAILURES_PER_USERNAME
    );
  },
  recordFailure({ ip, username }: Keys, now = Date.now()): void {
    if (buckets.size >= MAX_ENTRIES) prune(now);
    bump(`ip:${ip}`, now);
    bump(`user:${username}`, now);
  },
  reset({ ip, username }: Keys): void {
    buckets.delete(`ip:${ip}`);
    buckets.delete(`user:${username}`);
  },
};
