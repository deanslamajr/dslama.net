import { loginLimiter } from './rateLimit';

const WINDOW_MS = 15 * 60 * 1000;
const NOW = 1700000000000;

// The limiter keeps module state, so each test uses its own IPs and usernames.
const fail = (ip: string, username: string, times: number, now = NOW) => {
  for (let i = 0; i < times; i += 1) {
    loginLimiter.recordFailure({ ip, username }, now);
  }
};

describe('loginLimiter', () => {
  it('limits an IP after 5 failures', () => {
    fail('192.0.2.1', 'a1', 4);
    expect(
      loginLimiter.isLimited({ ip: '192.0.2.1', username: 'b1' }, NOW)
    ).toBe(false);
    fail('192.0.2.1', 'a1', 1);
    expect(
      loginLimiter.isLimited({ ip: '192.0.2.1', username: 'b1' }, NOW)
    ).toBe(true);
  });

  it('limits a username after 20 failures from any IPs', () => {
    for (let i = 0; i < 19; i += 1) {
      fail(`198.51.100.${i}`, 'target', 1);
    }
    expect(
      loginLimiter.isLimited({ ip: '198.51.100.200', username: 'target' }, NOW)
    ).toBe(false);
    fail('198.51.100.19', 'target', 1);
    expect(
      loginLimiter.isLimited({ ip: '198.51.100.200', username: 'target' }, NOW)
    ).toBe(true);
  });

  it('forgets failures after the 15 minute window', () => {
    fail('192.0.2.2', 'a2', 5);
    expect(
      loginLimiter.isLimited(
        { ip: '192.0.2.2', username: 'a2' },
        NOW + WINDOW_MS - 1
      )
    ).toBe(true);
    expect(
      loginLimiter.isLimited(
        { ip: '192.0.2.2', username: 'a2' },
        NOW + WINDOW_MS
      )
    ).toBe(false);
  });

  it('clears both keys after a successful login', () => {
    fail('192.0.2.3', 'a3', 5);
    loginLimiter.reset({ ip: '192.0.2.3', username: 'a3' });
    expect(
      loginLimiter.isLimited({ ip: '192.0.2.3', username: 'a3' }, NOW)
    ).toBe(false);
  });
});
