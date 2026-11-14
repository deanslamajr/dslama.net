import { Prisma } from '@prisma/client';

import {
  MutationResolvers,
  UpdateReadingsPageInput,
} from '../../../generated/graphql';
import { update } from '../postgresql/readingsPage';
import { ContextInterface } from '../../context';
import { requireActiveAccount } from '../../auth';
import { HTTP_PROTOCOLS, LIMITS } from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeUrl,
} from '../../validation';

// Validates a save. A restore of an old version runs through it too.
export const toCreateInput = (
  input: UpdateReadingsPageInput
): Prisma.ReadingsPageCreateInput => {
  const updateArgs = {} as Prisma.ReadingsPageCreateInput;

  // Summary
  updateArgs.summary = assertMaxLength(
    input.summary,
    LIMITS.longText,
    'summary'
  );

  // Readings
  const readings = assertMaxItems(input.readings, 'readings').map(
    (reading, index) => ({
      foundDate: reading.foundDate,
      publishDate: reading.publishDate,
      title: assertMaxLength(
        reading.title,
        LIMITS.shortText,
        `readings[${index}].title`
      ),
      author: assertMaxLength(
        reading.author,
        LIMITS.shortText,
        `readings[${index}].author`
      ),
      publication: assertMaxLength(
        reading.publication,
        LIMITS.shortText,
        `readings[${index}].publication`
      ),
      quote: assertMaxLength(
        reading.quote,
        LIMITS.quote,
        `readings[${index}].quote`
      ),
      url: normalizeUrl(reading.url, `readings[${index}].url`, HTTP_PROTOCOLS),
    })
  );
  if (readings.length) {
    updateArgs.readings = {
      create: readings,
    };
  }

  return updateArgs;
};

export const resolver: Required<
  MutationResolvers<ContextInterface>
>['updateReadingsPage'] = async (_parent, { input }, context, _info) => {
  await requireActiveAccount(context);

  const data = await update(toCreateInput(input));
  const sortedReadings = data.readings.sort(
    (a, b) => b.foundDate.getTime() - a.foundDate.getTime()
  );

  return {
    readings: sortedReadings,
    summary: data.summary,
  };
};
