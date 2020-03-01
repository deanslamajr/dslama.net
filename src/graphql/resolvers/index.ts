import { QueryResolvers, HomeMain } from '../types/about.graphqls';

const mockData: HomeMain = {
  links: [
    {
      name: 'Twitter',
      url: 'https://twitter.com/henryslama',
    },
    {
      name: 'KeyBase',
      url: 'https://keybase.io/deanslamajr',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/deanslamajr',
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@deanslamajr',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dean-slama-jr-9819558a/',
    },
  ],
  version: 3,
  pictureURL:
    'https://cdn-images-1.medium.com/max/1200/1*N6g_1y4LruXhJKEThiFUbg.jpeg',
  bio:
    'Intrigued by the connective power of the Internet, Dean finds obsession tinkering with and learning about the many technologies involved in the modern world wide web. Inspired by the notion of virtual worlds, Dean invents tomorrow\'s software, incorporating today\'s best practices. As a Software Development Engineer at <a href="https://www.concur.com" target="_blank">SAP Concur</a>, Dean helps design and implement GraphQL services that support high-trafficked, React.js web applications. He enjoys declarative, well-commented code and clean, quick user interfaces.',
  title: 'Full Stack Engineer',
};

const Query: Required<QueryResolvers> = {
  homeMain(_parent, _args, _context, _info): HomeMain {
    return mockData;
  },
};

export default { Query };
