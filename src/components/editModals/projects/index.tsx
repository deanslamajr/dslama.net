import React from 'react';

import { isRequired, isValidUrl } from '../../../utils';
import {
  FetchProjectsQuery,
  UpdateProjectsPageDocument,
} from '../../../graphql/generated/ops';
import { PageConfig, VersionedPageEditModal } from '../VersionedPageEditModal';

export type MutableProject = Omit<
  NonNullable<FetchProjectsQuery['projectsPage']['projects']>[number],
  'id' | '__typename' | 'originalPublishDate'
> & {
  originalPublishDate: string;
};

const config: PageConfig = {
  mutation: UpdateProjectsPageDocument,
  fieldsBeforeList: [
    {
      name: 'summary',
      kind: 'text',
      label: 'page summary',
      placeholder: 'What is this page about?',
    },
  ],
  list: {
    name: 'projects',
    itemLabel: 'Project',
    consoleKey: 'projects',
    fields: [
      {
        name: 'name',
        kind: 'text',
        placeholder: 'This is a Contrived Project Name',
        validate: isRequired,
      },
      {
        name: 'appUrl',
        kind: 'text',
        placeholder: 'https://someApp.dslama.net',
        validate: value => isValidUrl(value),
      },
      {
        name: 'sourceUrl',
        kind: 'text',
        placeholder: 'https://www.github.com/deanslama/someAppName',
        validate: value => (value ? isValidUrl(value) : undefined),
      },
      { name: 'description', kind: 'textarea', validate: isRequired },
      { name: 'summary', kind: 'textarea', validate: isRequired },
      { name: 'originalPublishDate', kind: 'date', validate: isRequired },
    ],
  },
  fieldsAfterList: [],
};

type ProjectsPageEditModalProps = {
  initialValues: FetchProjectsQuery['projectsPage'];
};

export const ProjectsPageEditModal: React.FC<ProjectsPageEditModalProps> = ({
  initialValues,
}) => <VersionedPageEditModal config={config} page={initialValues} />;
