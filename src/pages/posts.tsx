import { NextPage } from 'next';
import Head from 'next/head';

import { formatDate } from '../utils';

import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import { Header } from '../components/header';
import { Card } from '../components/Card';

import getServerSidePropsFactory from '../graphql/getServerSidePropsFactory';
import {
  useFetchPostsQuery,
  FetchPostsQuery,
  FetchPostsDocument
} from '../graphql/generated/ops';

const Posts: NextPage = () => {
  const { data, loading, error } = useFetchPostsQuery();

  return (
    <>
      <Head>
        <title>dslama.net - posts</title>
      </Head>
      <LoadingErrorOrRender<FetchPostsQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const { posts, summary } = (queryResult as FetchPostsQuery).postsPage;

          return (
            <div>
              <div>
                <Header summary={summary || ''} />
                {posts &&
                  posts.map(post => (
                    <Card
                      href={post?.url || ''}
                      key={post?.url || ''}
                      quote={post?.snippet || ''}
                      title={post?.title || ''}>
                      <div>{formatDate(post?.originalPublishDate)}</div>
                    </Card>
                  ))}
              </div>
            </div>
          );
        }}
      />
    </>
  );
};

export const getServerSideProps = getServerSidePropsFactory(FetchPostsDocument);

export default Posts;
