import {
  ResolvedInputFromConsole
} from '../../contexts/EditModeState';
import {MutableReading} from '../editModals/readings';
import {MutablePost} from '../editModals/PostsPageEditModal';

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

export const parseInputFromConsole = (): ResolvedInputFromConsole => {
  let resolvedInputFromConsole: ResolvedInputFromConsole = null;

  
  if (typeof window.__inputFromConsole !== 'undefined') {
    const unsafeInput = window.__inputFromConsole;
    
    const parsedPosts = parsePosts(unsafeInput.posts);
    const parsedReadings = parseReadings(unsafeInput.readings);

    if (parsedPosts || parsedReadings) {
      resolvedInputFromConsole = {
        posts: parsedPosts,
        readings: parsedReadings
      };
    }
  }


  return resolvedInputFromConsole;
}