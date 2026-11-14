import React from 'react';

import { isRequired, isValidUrl } from '../../../utils';
import { LINK_PROTOCOLS } from '../../../contentPolicy';
import {
  FetchAboutQuery,
  UpdateAboutPageDocument,
} from '../../../graphql/generated/ops';
import { PageConfig, VersionedPageEditModal } from '../VersionedPageEditModal';

const config: PageConfig = {
  mutation: UpdateAboutPageDocument,
  fieldsBeforeList: [
    {
      name: 'title',
      kind: 'text',
      placeholder: 'set a title string',
    },
  ],
  list: {
    name: 'links',
    itemLabel: 'Link',
    fields: [
      {
        name: 'name',
        kind: 'text',
        placeholder: 'Generic Socialmedia Platform',
        validate: isRequired,
      },
      {
        name: 'url',
        kind: 'text',
        placeholder: 'https://www.socialmedia.com',
        validate: value => isValidUrl(value, LINK_PROTOCOLS),
      },
    ],
  },
  fieldsAfterList: [
    {
      name: 'pictureURL',
      kind: 'text',
      label: 'banner pic url',
      validate: value => (value ? isValidUrl(value) : undefined),
    },
    { name: 'bio', kind: 'textarea', label: 'bio (Markdown)' },
  ],
};

type AboutPageEditModalProps = {
  initialValues: FetchAboutQuery;
};

export const AboutPageEditModal: React.FC<AboutPageEditModalProps> = ({
  initialValues,
}) => <VersionedPageEditModal config={config} page={initialValues.aboutPage} />;
