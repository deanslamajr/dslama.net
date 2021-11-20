import {AuthenticationError} from 'apollo-server-micro';
import { Prisma } from '@prisma/client'

import { MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/readingsPage';
import {ContextInterface} from '../../context';

export const resolver: Required<MutationResolvers<ContextInterface>>['updateReadingsPage'] = async (
  _parent,
  {input},
  context,
  _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
    const updateArgs = {} as Prisma.ReadingsPageCreateInput;

    // Summary
    updateArgs.summary = input.summary;

    // Posts
    if (input.readings.length) {
      updateArgs.readings = {
        create: [...input.readings]
      };
    }

    const data = await update(updateArgs);
    const sortedProjects = data.readings.sort(
      (a, b) => b.foundDate.getTime() - a.foundDate.getTime()
    );
  
    return {
      readings: sortedProjects,
      summary: data.summary
    };
  }

  throw new AuthenticationError('This action requires an authenticated account.');
};
