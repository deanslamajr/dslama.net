import { IncomingMessage } from 'http';

import { getClientIp } from './context';

const request = (forwardedFor?: string, remoteAddress = '10.0.0.5') =>
  (({
    headers:
      forwardedFor === undefined ? {} : { 'x-forwarded-for': forwardedFor },
    socket: { remoteAddress },
  } as unknown) as IncomingMessage);

describe('getClientIp', () => {
  it('takes the address that the load balancer appended', () => {
    expect(getClientIp(request('203.0.113.7, 34.120.0.1'))).toBe('203.0.113.7');
  });

  it('ignores addresses that the client added in front', () => {
    expect(getClientIp(request('1.1.1.1, 203.0.113.7, 34.120.0.1'))).toBe(
      '203.0.113.7'
    );
  });

  it('falls back to the socket address without the header', () => {
    expect(getClientIp(request())).toBe('10.0.0.5');
    expect(getClientIp(request('203.0.113.7'))).toBe('10.0.0.5');
  });
});
