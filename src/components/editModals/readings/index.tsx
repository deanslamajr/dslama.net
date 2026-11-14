import React from 'react';

import { isRequired, isValidUrl } from '../../../utils';
import {
  FetchReadingsQuery,
  UpdateReadingsPageDocument,
} from '../../../graphql/generated/ops';
import { PageConfig, VersionedPageEditModal } from '../VersionedPageEditModal';

export type MutableReading = Omit<
  NonNullable<FetchReadingsQuery['readingsPage']['readings']>[number],
  'id' | '__typename' | 'publishDate' | 'foundDate'
> & {
  publishDate: string;
  foundDate: string;
};

const config: PageConfig = {
  mutation: UpdateReadingsPageDocument,
  fieldsBeforeList: [
    {
      name: 'summary',
      kind: 'text',
      label: 'page summary',
      placeholder: 'What is this page about?',
    },
  ],
  list: {
    name: 'readings',
    itemLabel: 'Reading',
    consoleKey: 'readings',
    fields: [
      {
        name: 'title',
        kind: 'text',
        placeholder: 'This is a Contrived Reading Title',
        validate: isRequired,
      },
      {
        name: 'author',
        kind: 'text',
        placeholder: 'Captain Author Smith',
        validate: isRequired,
      },
      {
        name: 'url',
        kind: 'text',
        placeholder: 'https://www.blogsRus.com',
        validate: value => isValidUrl(value),
      },
      { name: 'quote', kind: 'textarea', validate: isRequired },
      {
        name: 'publication',
        kind: 'text',
        placeholder: 'Blogs R Us',
        validate: isRequired,
      },
      { name: 'publishDate', kind: 'date', validate: isRequired },
      { name: 'foundDate', kind: 'date', validate: isRequired },
    ],
  },
  fieldsAfterList: [],
};

type ReadingsPageEditModalProps = {
  initialValues: FetchReadingsQuery['readingsPage'];
};

export const ReadingsPageEditModal: React.FC<ReadingsPageEditModalProps> = ({
  initialValues,
}) => <VersionedPageEditModal config={config} page={initialValues} />;
