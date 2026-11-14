import { Prisma } from '@prisma/client';

import {
  MutationResolvers,
  UpdateProjectsPageInput,
} from '../../../generated/graphql';
import { update } from '../postgresql/projectsPage';
import { ContextInterface } from '../../context';
import { requireActiveAccount } from '../../auth';
import { HTTP_PROTOCOLS, LIMITS } from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeOptionalUrl,
  normalizeUrl,
} from '../../validation';

// Validates a save. A restore of an old version runs through it too.
export const toCreateInput = (
  input: UpdateProjectsPageInput
): Prisma.ProjectsPageCreateInput => {
  const updateArgs = {} as Prisma.ProjectsPageCreateInput;

  // Summary
  updateArgs.summary = assertMaxLength(
    input.summary,
    LIMITS.longText,
    'summary'
  );

  // Projects
  const projects = assertMaxItems(input.projects, 'projects').map(
    (project, index) => ({
      originalPublishDate: project.originalPublishDate,
      name: assertMaxLength(
        project.name,
        LIMITS.shortText,
        `projects[${index}].name`
      ),
      description: assertMaxLength(
        project.description,
        LIMITS.longText,
        `projects[${index}].description`
      ),
      summary: assertMaxLength(
        project.summary,
        LIMITS.longText,
        `projects[${index}].summary`
      ),
      appUrl: normalizeUrl(
        project.appUrl,
        `projects[${index}].appUrl`,
        HTTP_PROTOCOLS
      ),
      sourceUrl: normalizeOptionalUrl(
        project.sourceUrl,
        `projects[${index}].sourceUrl`,
        HTTP_PROTOCOLS
      ),
    })
  );
  if (projects.length) {
    updateArgs.projects = {
      create: projects,
    };
  }

  return updateArgs;
};

export const resolver: Required<
  MutationResolvers<ContextInterface>
>['updateProjectsPage'] = async (_parent, { input }, context, _info) => {
  await requireActiveAccount(context);

  const data = await update(toCreateInput(input));
  const sortedProjects = data.projects.sort(
    (a, b) => b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
  );

  return {
    projects: sortedProjects,
    summary: data.summary,
  };
};
