import { Resolver, ResolversTypes } from '../types/projects.graphqls';
import { get as getProjects } from './models/projects';
import { Project } from '../../types';

interface RawProject {
  id: string;
  url: string;
  name: string;
  description: string;
  order: number;
  source: string;
  summary: string;
}

const transformRawProject: (rawProject: RawProject) => Project = rawProject => {
  return {
    id: rawProject.id,
    appUrl: rawProject.url,
    description: rawProject.description,
    name: rawProject.name,
    sourceUrl: rawProject.source,
    summary: rawProject.summary,
  };
};

export const resolver: Resolver<ResolversTypes['ProjectsPayload']> = async (
  _parent: any,
  _args: any,
  _context: any,
  _info: any
) => {
  // summary: 'A quick and modern about page! All page data is lazy-fetched from an Amazon RDS datastore.<br><br>This identity portal uses React with React Router to present the various views in a quick, AJAX-powered single page application. Redux is used to maintain global state between the views. The CSS modules styling pattern is used to have styles strongly coupled to specific components for safe and easy CSS managment.',
  // source: 'https://github.com/deanslamajr/dslama.net',
  // order: 0,
  // description: 'The web experience you are currently enjoying!',
  // id: '7d2b734c-a1b4-4b3f-939d-6ceda599c209',
  // url: 'https://www.dslama.net',
  // name: 'dslama.net'
  const rawProjects = await getProjects();

  return {
    projects: rawProjects
      .sort((a: RawProject, b: RawProject) => b.order - a.order)
      .map(transformRawProject),
    // @TODO move this to the DB
    summary: 'Cool, handbuilt webapps. Click on a title to start one up.',
  };
};
