import getConfig from 'next/config';
import axios from 'axios';

import { Post } from '../../../generated/graphql';

const { serverRuntimeConfig } = getConfig();

const mediumUser = serverRuntimeConfig.MEDIUM_USERNAME;

const transformRawPost: (rawPost: any) => Post = rawPost => {
  const url = `https://medium.com/${mediumUser}/${rawPost.uniqueSlug}`;
  const snippet = rawPost?.previewContent?.bodyModel?.paragraphs[1]?.text;

  return {
    url,
    originalPublishDate: new Date(rawPost.firstPublishedAt),
    title: rawPost?.title,
    snippet,
  };
};

export const get = async () => {
  const headers = { Accept: 'application/json' };

  const response = await axios.get(`https://medium.com/${mediumUser}/latest`, {
    headers,
  });

  if (!response.data) {
    throw new Error('Posts query has failed!');
  }

  // the first 16 characters of the response are unnusable giberish
  const cleanedData = response.data.substring(16);

  const jsonifiedData = JSON.parse(cleanedData);
  const postsObject = jsonifiedData.payload.references.Post;

  return Object.keys(postsObject)
    .map(key => postsObject[key])
    .map(transformRawPost);
};
