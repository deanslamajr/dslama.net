import { Prisma } from '@prisma/client'
import { prisma } from '.';

export const fetchMostRecentVersion = () => {
    return prisma.aboutPage.findFirst({
        include: {
            links: true
        },
        orderBy: {
            version: 'desc'
        }
    })
};

export const update = (input: Prisma.AboutPageCreateInput) => {
    return prisma.aboutPage.create({
        data: input,
        include: {
            links: true
        }
    });
}