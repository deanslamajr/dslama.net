import { HTTP_PROTOCOLS, isAllowedUrl } from './contentPolicy';

export {
  formatDate,
  transformGqlDateForDateInput,
  transformDateInputValueToGqlDate,
} from './dates';

export function isValidUrl(
  potentialUrl?: string,
  protocols: string[] = HTTP_PROTOCOLS
) {
  if (potentialUrl && isAllowedUrl(potentialUrl, protocols)) {
    return undefined;
  }
  return `Must be a valid ${protocols
    .map(p => p.replace(':', ''))
    .join(' or ')} URL, for example https://example.com`;
}

export const isRequired = (value?: string) =>
  Boolean(value) ? undefined : 'This field is required.';
