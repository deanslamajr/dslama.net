import getConfig from 'next/config';

import db from './db';
import { Project } from '../../types/projects.graphqls';

const { serverRuntimeConfig } = getConfig();

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

export const get: () => Promise<Project[]> = async () => {
  const rawProjects: RawProject[] = await db
    .table(serverRuntimeConfig.DYNAMO_TABLE_PROJECTS)
    .scan();

  return rawProjects
    .sort((a: RawProject, b: RawProject) => b.order - a.order)
    .map(transformRawProject);
};
