import { Prisma } from '@prisma/client'
import { prisma } from '.';

export const fetchMostRecentVersion = () => {
    return prisma.readingsPage.findFirst({
        include: {
            readings: true
        },
        orderBy: {
            version: 'desc'
        }
    })
};

export const update = (input: Prisma.ReadingsPageCreateInput) => {
    return prisma.readingsPage.create({
        data: input,
        include: {
          readings: true
        }
    });
}