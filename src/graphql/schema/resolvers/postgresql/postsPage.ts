import { Prisma } from '@prisma/client'
import { prisma } from '.';

export const fetchMostRecentVersion = () => {
    return prisma.postsPage.findFirst({
        include: {
            posts: true
        },
        orderBy: {
            version: 'desc'
        }
    })
};

export const update = (input: Prisma.PostsPageCreateInput) => {
    return prisma.postsPage.create({
        data: input,
        include: {
          posts: true
        }
    });
}