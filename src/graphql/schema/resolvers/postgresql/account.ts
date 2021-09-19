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