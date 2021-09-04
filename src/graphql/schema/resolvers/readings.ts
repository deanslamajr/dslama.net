import { Resolver, ReadingsPage } from '../../generated/graphql';
import { get as getReadings } from './models/readings';

export const resolver: Resolver<ReadingsPage> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const readings = await getReadings();

  return {
    readings,
    // @TODO move this to the DB
    summary:
      'Possibly helpful, possibly insightful, and/or possibly interesting write-ups on all things web development.',
  };
};
