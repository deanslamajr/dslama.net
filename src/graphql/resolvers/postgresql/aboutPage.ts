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