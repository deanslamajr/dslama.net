import { UserInputError } from 'apollo-server-micro';

import { HTTP_PROTOCOLS, LIMITS } from '../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeOptionalUrl,
  normalizeUrl,
} from './validation';

// Joined at runtime, because ESLint's no-script-url flags the literal.
const SCRIPT_URL = ['javascript', 'alert(1)'].join(':');

describe('assertMaxLength', () => {
  it('returns a value at the limit', () => {
    expect(assertMaxLength('abc', 3, 'title')).toBe('abc');
  });

  it('throws BAD_USER_INPUT over the limit', () => {
    expect(() => assertMaxLength('abcd', 3, 'title')).toThrow(
      new UserInputError('title must be at most 3 characters.')
    );
  });
});

describe('assertMaxItems', () => {
  it('allows the item limit and refuses one more', () => {
    const items = new Array(LIMITS.items).fill(0);
    expect(assertMaxItems(items, 'posts')).toBe(items);
    expect(() => assertMaxItems([...items, 0], 'posts')).toThrow(
      `posts must have at most ${LIMITS.items} entries.`
    );
  });
});

describe('normalizeUrl', () => {
  it('trims and normalizes the URL', () => {
    expect(
      normalizeUrl('  https://Example.com/a b ', 'url', HTTP_PROTOCOLS)
    ).toBe('https://example.com/a%20b');
  });

  it('gives the same value on every save', () => {
    const once = normalizeUrl(
      'https://example.com/a%20b',
      'url',
      HTTP_PROTOCOLS
    );
    expect(normalizeUrl(once, 'url', HTTP_PROTOCOLS)).toBe(once);
  });

  it('refuses invalid URLs and other protocols', () => {
    expect(() => normalizeUrl('not a url', 'url', HTTP_PROTOCOLS)).toThrow(
      'url must be a valid URL.'
    );
    expect(() => normalizeUrl(SCRIPT_URL, 'url', HTTP_PROTOCOLS)).toThrow(
      'url must use http: or https:'
    );
  });

  it('refuses URLs over the length limit', () => {
    const long = `https://example.com/${'a'.repeat(LIMITS.url)}`;
    expect(() => normalizeUrl(long, 'url', HTTP_PROTOCOLS)).toThrow(
      `url must be at most ${LIMITS.url} characters.`
    );
  });

  it('marks errors as user input errors', () => {
    let caught: UserInputError | undefined;
    try {
      normalizeUrl('nope', 'links[2].url', HTTP_PROTOCOLS);
    } catch (error) {
      caught = error as UserInputError;
    }
    expect(caught).toBeInstanceOf(UserInputError);
    expect(caught?.extensions).toMatchObject({
      code: 'BAD_USER_INPUT',
      field: 'links[2].url',
    });
  });
});

describe('normalizeOptionalUrl', () => {
  it('keeps an empty value and checks any other', () => {
    expect(normalizeOptionalUrl('  ', 'sourceUrl', HTTP_PROTOCOLS)).toBe('');
    expect(
      normalizeOptionalUrl('https://github.com/x', 'sourceUrl', HTTP_PROTOCOLS)
    ).toBe('https://github.com/x');
    expect(() =>
      normalizeOptionalUrl('ftp://x', 'sourceUrl', HTTP_PROTOCOLS)
    ).toThrow(UserInputError);
  });
});
