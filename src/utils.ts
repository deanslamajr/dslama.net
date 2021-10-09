export const formatDate: (epochDate?: number) => string = epochDate => {
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

export function isValidUrl(potentialUrl: string) {
  let errorMessage: string | undefined = undefined;
  
  try {
    new URL(potentialUrl);
  } catch (_) {
    errorMessage = 'Must be valid url e.g. https://google.com';
  }

  return errorMessage;
}