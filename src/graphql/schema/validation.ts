import { UserInputError } from 'apollo-server-micro';
import { LIMITS } from '../../contentPolicy';

export const assertMaxLength = (value: string, max: number, field: string): string => {
  if (value.length > max) {
    throw new UserInputError(`${field} must be at most ${max} characters.`, { field });
  }
  return value;
};

export const assertMaxItems = <T>(items: T[], field: string): T[] => {
  if (items.length > LIMITS.items) {
    throw new UserInputError(`${field} must have at most ${LIMITS.items} entries.`, { field });
  }
  return items;
};

// new URL().toString() normalizes once. It does not encode "%" again,
// so repeated saves keep the same value (fixes the encodeURI corruption).
export const normalizeUrl = (value: string, field: string, protocols: string[]): string => {
  let parsed: URL;
  try {
    parsed = new URL(value.trim());
  } catch (error) {
    throw new UserInputError(`${field} must be a valid URL.`, { field });
  }
  if (protocols.indexOf(parsed.protocol) === -1) {
    throw new UserInputError(`${field} must use ${protocols.join(' or ')}`, { field });
  }
  return assertMaxLength(parsed.toString(), LIMITS.url, field);
};

export const normalizeOptionalUrl = (value: string, field: string, protocols: string[]): string =>
  value.trim() === '' ? '' : normalizeUrl(value, field, protocols);
