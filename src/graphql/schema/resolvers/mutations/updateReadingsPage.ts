import {AuthenticationError} from 'apollo-server-micro';
import { Prisma } from '@prisma/client'

import { MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/readingsPage';
import {ContextInterface} from '../../context';
import { HTTP_PROTOCOLS, LIMITS } from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeUrl,
} from '../../validation';

export const resolver: Required<MutationResolvers<ContextInterface>>['updateReadingsPage'] = async (
  _parent,
  {input},
  context,
  _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
    const updateArgs = {} as Prisma.ReadingsPageCreateInput;

    // Summary
    updateArgs.summary = assertMaxLength(input.summary, LIMITS.longText, 'summary');

    // Posts
    const readings = assertMaxItems(input.readings, 'readings').map((reading, index) => ({
      foundDate: reading.foundDate,
      publishDate: reading.publishDate,
      title: assertMaxLength(reading.title, LIMITS.shortText, `readings[${index}].title`),
      author: assertMaxLength(reading.author, LIMITS.shortText, `readings[${index}].author`),
      publication: assertMaxLength(reading.publication, LIMITS.shortText, `readings[${index}].publication`),
      quote: assertMaxLength(reading.quote, LIMITS.quote, `readings[${index}].quote`),
      url: normalizeUrl(reading.url, `readings[${index}].url`, HTTP_PROTOCOLS),
    }));
    if (readings.length) {
      updateArgs.readings = {
        create: readings
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
