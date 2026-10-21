import {AuthenticationError} from 'apollo-server-micro';
import { Prisma } from '@prisma/client'

import { MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/projectsPage';
import {ContextInterface} from '../../context';
import { HTTP_PROTOCOLS, LIMITS } from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeOptionalUrl,
  normalizeUrl,
} from '../../validation';

export const resolver: Required<MutationResolvers<ContextInterface>>['updateProjectsPage'] = async (
  _parent,
  {input},
  context,
  _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
    const updateArgs = {} as Prisma.ProjectsPageCreateInput;

    // Summary
    updateArgs.summary = assertMaxLength(input.summary, LIMITS.longText, 'summary');

    // Posts
    const projects = assertMaxItems(input.projects, 'projects').map((project, index) => ({
      originalPublishDate: project.originalPublishDate,
      name: assertMaxLength(project.name, LIMITS.shortText, `projects[${index}].name`),
      description: assertMaxLength(project.description, LIMITS.longText, `projects[${index}].description`),
      summary: assertMaxLength(project.summary, LIMITS.longText, `projects[${index}].summary`),
      appUrl: normalizeUrl(project.appUrl, `projects[${index}].appUrl`, HTTP_PROTOCOLS),
      sourceUrl: normalizeOptionalUrl(project.sourceUrl, `projects[${index}].sourceUrl`, HTTP_PROTOCOLS),
    }));
    if (projects.length) {
      updateArgs.projects = {
        create: projects
      };
    }

    const data = await update(updateArgs);
    const sortedProjects = data.projects.sort(
      (a, b) => b.originalPublishDate.getTime() - a.originalPublishDate.getTime()
    );
  
    return {
      projects: sortedProjects,
      summary: data.summary
    };
  }

  throw new AuthenticationError('This action requires an authenticated account.');
};
