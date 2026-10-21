import {
  Scalars
} from './graphql/generated/ops';
import { HTTP_PROTOCOLS, isAllowedUrl } from './contentPolicy';

export const formatDate: (epochDate?: number | string | null) => string = epochDate => {
  if (!epochDate) {
    return '';
  }
  const date = new Date(epochDate);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  return formattedDate;
};

export function isValidUrl(potentialUrl?: string, protocols: string[] = HTTP_PROTOCOLS) {
  if (potentialUrl && isAllowedUrl(potentialUrl, protocols)) {
    return undefined;
  }
  return `Must be a valid ${protocols.map(p => p.replace(':', '')).join(' or ')} URL, for example https://example.com`;
}

export const isRequired = (value?: string) => Boolean(value) ? undefined : 'This field is required.'

export const transformGqlDateForDateInput = (gqlDate: Scalars['Date']): string => {
  return new Date(gqlDate).toISOString();
};

export const transformDateInputValueToGqlDate = (dateFromDateInput: string): Scalars['Date'] => {
  return new Date(dateFromDateInput).getTime();
};