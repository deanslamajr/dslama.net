// The four page models share one shape: an autoincrement `version` and one
// list of child rows. A save creates a new version. Old versions stay.
type Include = Record<string, true>;

export type VersionSummary = { version: number; createdAt: Date };

type Delegate<Page, CreateInput> = {
  findFirst(args: {
    include: Include;
    orderBy: { version: 'desc' };
  }): Promise<Page | null>;
  findUnique(args: {
    where: { version: number };
    include: Include;
  }): Promise<Page | null>;
  findMany(args: {
    select: { version: true; createdAt: true };
    orderBy: { version: 'desc' };
    take: number;
  }): Promise<VersionSummary[]>;
  create(args: { data: CreateInput; include: Include }): Promise<Page>;
};

type VersionedPage<Page, CreateInput> = {
  fetchNewest: () => Promise<Page | null>;
  fetchVersion: (version: number) => Promise<Page | null>;
  listVersions: (take: number) => Promise<VersionSummary[]>;
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
    fetchVersion: version => model.findUnique({ where: { version }, include }),
    listVersions: take =>
      model.findMany({
        select: { version: true, createdAt: true },
        orderBy: { version: 'desc' },
        take,
      }),
    createVersion: data => model.create({ data, include }),
  };
};
