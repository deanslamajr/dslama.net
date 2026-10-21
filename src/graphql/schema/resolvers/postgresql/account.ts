import { Prisma, Account } from '@prisma/client'
import { prisma } from '.';

type Fetch = (params: {
  username: string;
}) => Promise<Account | null>;

export const fetch: Fetch = ({username}) => {
    return prisma.account.findFirst({
      where: {
        username
      },
    })
};

export const fetchById = (id: string) => prisma.account.findUnique({ where: { id } });

type UpdateParams = {
  id: string;
} & Omit<Prisma.AccountUncheckedUpdateInput, 'id'>;

export const update = ({
  id, lastLoginAt
}: UpdateParams) => {
  return prisma.account.update({
    where: {
      id,
    },
    data: {
      lastLoginAt,
    },
  })
}