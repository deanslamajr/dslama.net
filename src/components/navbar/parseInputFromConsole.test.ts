/**
 * @jest-environment jsdom
 */
import { parseInputFromConsole } from './parseInputFromConsole';

const stamp = Date.UTC(2017, 0, 29, 12);
const post = {
  url: 'https://a.example',
  title: 't',
  snippet: 's',
  originalPublishDate: stamp,
};

afterEach(() => {
  delete window.__inputFromConsole;
});

describe('parseInputFromConsole', () => {
  it('returns null without console input', () => {
    expect(parseInputFromConsole()).toBeNull();
  });

  it('keeps only items with the right shape', () => {
    window.__inputFromConsole = {
      posts: [post, { ...post, originalPublishDate: '2017-01-29' }, null, 'x'],
    };
    const result = parseInputFromConsole();
    expect(result?.posts).toHaveLength(1);
    expect(result?.projects).toBeUndefined();
    expect(result?.readings).toBeUndefined();
  });

  it('converts epoch dates into date input values', () => {
    window.__inputFromConsole = { posts: [post] };
    const parsed = parseInputFromConsole()?.posts?.[0];
    const local = new Date(parsed?.originalPublishDate || '');
    expect([local.getFullYear(), local.getMonth(), local.getDate()]).toEqual([
      2017,
      0,
      29,
    ]);
  });

  it('parses projects and readings', () => {
    window.__inputFromConsole = {
      projects: [
        {
          name: 'n',
          description: 'd',
          summary: 's',
          appUrl: 'https://app.example',
          sourceUrl: '',
          originalPublishDate: stamp,
        },
      ],
      readings: [
        {
          author: 'a',
          title: 't',
          url: 'https://r.example',
          publication: 'p',
          quote: 'q',
          publishDate: stamp,
          foundDate: stamp,
        },
        { author: 'missing fields' },
      ],
    };
    const result = parseInputFromConsole();
    expect(result?.projects).toHaveLength(1);
    expect(result?.readings).toHaveLength(1);
  });

  it('returns null when nothing has the right shape', () => {
    window.__inputFromConsole = { posts: [{}], projects: 'x', readings: null };
    expect(parseInputFromConsole()).toBeNull();
  });
});
