// The four page models share one shape: an autoincrement `version` and one
// list of child rows. A save creates a new version. Old versions stay.
type Include = Record<string, true>;

type Delegate<Page, CreateInput> = {
  findFirst(args: {
    include: Include;
    orderBy: { version: 'desc' };
  }): Promise<Page | null>;
  create(args: { data: CreateInput; include: Include }): Promise<Page>;
};

type VersionedPage<Page, CreateInput> = {
  fetchNewest: () => Promise<Page | null>;
  createVersion: (data: CreateInput) => Promise<Page>;
};

// Prisma gives each model its own delegate type, so the caller names the
// page type and the create input type, and the delegate is checked here.
export const versionedPage = <Page, CreateInput>(
  delegate: unknown,
  include: Include
): VersionedPage<Page, CreateInput> => {
  const model = delegate as Delegate<Page, CreateInput>;
  return {
    fetchNewest: () =>
      model.findFirst({ include, orderBy: { version: 'desc' } }),
    createVersion: data => model.create({ data, include }),
  };
};
