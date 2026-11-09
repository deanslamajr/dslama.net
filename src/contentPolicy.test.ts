import { HTTP_PROTOCOLS, LINK_PROTOCOLS, isAllowedUrl } from './contentPolicy';

// Joined at runtime, because ESLint's no-script-url flags the literal.
const SCRIPT_URL = ['javascript', 'alert(1)'].join(':');

describe('isAllowedUrl', () => {
  it('allows only the listed protocols', () => {
    expect(isAllowedUrl('https://example.com', HTTP_PROTOCOLS)).toBe(true);
    expect(isAllowedUrl('http://example.com/a?b=c', HTTP_PROTOCOLS)).toBe(true);
    expect(isAllowedUrl('mailto:me@example.com', HTTP_PROTOCOLS)).toBe(false);
    expect(isAllowedUrl('mailto:me@example.com', LINK_PROTOCOLS)).toBe(true);
  });

  it('refuses script and data URLs', () => {
    expect(isAllowedUrl(SCRIPT_URL, LINK_PROTOCOLS)).toBe(false);
    expect(isAllowedUrl(' JavaScript:alert(1)', LINK_PROTOCOLS)).toBe(false);
    expect(isAllowedUrl('data:text/html,<b>x</b>', LINK_PROTOCOLS)).toBe(false);
  });

  it('refuses values that are not absolute URLs', () => {
    expect(isAllowedUrl('', HTTP_PROTOCOLS)).toBe(false);
    expect(isAllowedUrl('/posts', HTTP_PROTOCOLS)).toBe(false);
    expect(isAllowedUrl('example.com', HTTP_PROTOCOLS)).toBe(false);
  });
});
