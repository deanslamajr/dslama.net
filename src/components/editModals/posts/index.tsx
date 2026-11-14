import React from 'react';

import { isRequired, isValidUrl } from '../../../utils';
import {
  FetchPostsQuery,
  UpdatePostsPageDocument,
} from '../../../graphql/generated/ops';
import { PageConfig, VersionedPageEditModal } from '../VersionedPageEditModal';

export type MutablePost = Omit<
  NonNullable<FetchPostsQuery['postsPage']['posts']>[number],
  '__typename' | 'id' | 'originalPublishDate'
> & {
  originalPublishDate: string;
};

const config: PageConfig = {
  mutation: UpdatePostsPageDocument,
  fieldsBeforeList: [
    {
      name: 'summary',
      kind: 'text',
      label: 'page summary',
      placeholder: 'What is this page about?',
    },
  ],
  list: {
    name: 'posts',
    itemLabel: 'Post',
    consoleKey: 'posts',
    fields: [
      {
        name: 'title',
        kind: 'text',
        placeholder: 'This is a Contrived Post Title',
        validate: isRequired,
      },
      {
        name: 'url',
        kind: 'text',
        placeholder: 'https://www.deansblog.com',
        validate: value => isValidUrl(value),
      },
      { name: 'snippet', kind: 'textarea', validate: isRequired },
      { name: 'originalPublishDate', kind: 'date', validate: isRequired },
    ],
  },
  fieldsAfterList: [],
};

type PostsPageEditModalProps = {
  initialValues: Omit<FetchPostsQuery['postsPage'], '__typename'>;
};

export const PostsPageEditModal: React.FC<PostsPageEditModalProps> = ({
  initialValues,
}) => <VersionedPageEditModal config={config} page={initialValues} />;
