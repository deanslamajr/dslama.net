import {AuthenticationError} from 'apollo-server-micro';
import { Prisma } from '@prisma/client'

import { MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/projectsPage';
import {ContextInterface} from '../../context';

export const resolver: Required<MutationResolvers<ContextInterface>>['updateProjectsPage'] = async (
  _parent,
  {input},
  context,
  _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
    const updateArgs = {} as Prisma.ProjectsPageCreateInput;

    // Summary
    updateArgs.summary = input.summary;

    // Posts
    if (input.projects.length) {
      updateArgs.projects = {
        create: [...input.projects]
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
