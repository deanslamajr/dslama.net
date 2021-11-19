import { Prisma } from '@prisma/client'
import { prisma } from '.';

export const fetchMostRecentVersion = () => {
    return prisma.projectsPage.findFirst({
        include: {
            projects: true
        },
        orderBy: {
            version: 'desc'
        }
    })
};

export const update = (input: Prisma.ProjectsPageCreateInput) => {
    return prisma.projectsPage.create({
        data: input,
        include: {
          projects: true
        }
    });
}