import {
  ResolvedInputFromConsole
} from '../../contexts/EditModeState';
import {MutableReading} from '../editModals/readings';
import {MutablePost} from '../editModals/posts';
import {MutableProject} from '../editModals/projects';

declare global {
  interface Window {
    __inputFromConsole?: {
      posts?: any;
      projects?: any;
      readings?: any;
    };
  }
}

const isAPost = (possiblyAPost: any): possiblyAPost is MutablePost => (
  typeof possiblyAPost === 'object' &&
  typeof possiblyAPost.url === 'string' &&
  typeof possiblyAPost.title === 'string' &&
  typeof possiblyAPost.snippet === 'string' &&
  typeof possiblyAPost.originalPublishDate === 'number'
);

const parsePosts = (posts: any): MutablePost[] | undefined => {
  let parsedPosts: MutablePost[] | undefined;

  if (posts && Array.isArray(posts)) {
    posts
      .filter(isAPost)
      .forEach(postFromConsoleInput => {
        if (!parsedPosts) {
          parsedPosts = [] as MutablePost[];
        }

        parsedPosts.push({
          title: postFromConsoleInput.title,
          originalPublishDate: postFromConsoleInput.originalPublishDate,
          url: postFromConsoleInput.url,
          snippet: postFromConsoleInput.snippet
        });
      });
  }

  return parsedPosts;
};

const isAReading = (possiblyAReading: any): possiblyAReading is MutableReading => (
  typeof possiblyAReading === 'object' &&
  typeof possiblyAReading.author === 'string' &&
  typeof possiblyAReading.foundDate === 'number' &&
  typeof possiblyAReading.publishDate === 'number' &&
  typeof possiblyAReading.publication === 'string' &&
  typeof possiblyAReading.quote === 'string' &&
  typeof possiblyAReading.title === 'string' &&
  typeof possiblyAReading.url === 'string'
);

const parseReadings = (readings: any): MutableReading[] | undefined => {
  let parsedReadings: MutableReading[] | undefined;

  if (readings && Array.isArray(readings)) {
    readings
      .filter(isAReading)
      .forEach(readingFromConsoleInput => {
        if (!parsedReadings) {
          parsedReadings = [] as MutableReading[];
        }

        parsedReadings.push({
          author: readingFromConsoleInput.author,
          foundDate: readingFromConsoleInput.foundDate.toString(),
          publishDate: readingFromConsoleInput.publishDate.toString(),
          publication: readingFromConsoleInput.publication,
          quote: readingFromConsoleInput.quote,
          title: readingFromConsoleInput.title,
          url: readingFromConsoleInput.url
        });
      });
  }

  return parsedReadings;
};

const isAProject = (possiblyAProject: any): possiblyAProject is MutableProject => (
  typeof possiblyAProject === 'object' &&
  // typeof possiblyAProject.originalPublishDate === 'number' &&
  typeof possiblyAProject.description === 'string' &&
  typeof possiblyAProject.appUrl === 'string' &&
  typeof possiblyAProject.sourceUrl === 'string' &&
  typeof possiblyAProject.summary === 'string' &&
  typeof possiblyAProject.name === 'string'
);

const parseProjects = (projects: any): MutableProject[] | undefined => {
  let parsedProjects: MutableProject[] | undefined;

  if (projects && Array.isArray(projects)) {
    projects
      .filter(isAProject)
      .forEach(readingFromConsoleInput => {
        if (!parsedProjects) {
          parsedProjects = [] as MutableProject[];
        }

        parsedProjects.push({
          name: readingFromConsoleInput.name,
          originalPublishDate: readingFromConsoleInput.originalPublishDate.toString(),
          description: readingFromConsoleInput.description,
          appUrl: readingFromConsoleInput.appUrl,
          sourceUrl: readingFromConsoleInput.sourceUrl,
          summary: readingFromConsoleInput.summary
        });
      });
  }

  return parsedProjects;
};

export const parseInputFromConsole = (): ResolvedInputFromConsole => {
  let resolvedInputFromConsole: ResolvedInputFromConsole = null;

  
  if (typeof window.__inputFromConsole !== 'undefined') {
    const unsafeInput = window.__inputFromConsole;
    
    const parsedPosts = parsePosts(unsafeInput.posts);
    const parsedReadings = parseReadings(unsafeInput.readings);
    const parsedProjects = parseProjects(unsafeInput.projects);

    if (parsedPosts || parsedReadings || parsedProjects) {
      resolvedInputFromConsole = {
        posts: parsedPosts,
        projects: parsedProjects,
        readings: parsedReadings
      };
    }
  }


  return resolvedInputFromConsole;
}