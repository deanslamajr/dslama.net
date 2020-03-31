import { NextPage } from 'next';
import Head from 'next/head';

import { formatDate } from '../../utils';

import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { Header } from '../../components/header';
import {
  CardLink,
  Details,
  OuterContainer,
  Quote,
  ShadowCard,
  Title,
} from '../../components/Card';

import { withApollo } from '../../graphql/with-apollo';

import {
  useFetchPostsQuery,
  FetchPostsQuery,
} from '../../graphql/queries/fetchPosts.graphql';

const Posts: NextPage = () => {
  const { data, loading, error } = useFetchPostsQuery();

  return (
    <LoadingErrorOrRender<FetchPostsQuery>
      error={error}
      isLoading={loading}
      queryResult={data}
      render={({ queryResult }) => {
        const { posts, summary } = (queryResult as FetchPostsQuery).postsQuery;

        return (
          <div>
            <Head>
              <title>dslama.net - posts</title>
            </Head>
            <div>
              <Header summary={summary || ''} />
              {posts &&
                posts.map(post => (
                  <OuterContainer key={post?.url || ''}>
                    <CardLink href={post?.url || ''} target="_blank">
                      <ShadowCard>
                        <Title>{post?.title}</Title>
                        <Details>
                          <div>
                            {post
                              ? formatDate(post.originalPublishDate as number)
                              : ''}
                          </div>
                        </Details>
                        <Quote>{post?.snippet}</Quote>
                      </ShadowCard>
                    </CardLink>
                  </OuterContainer>
                ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default withApollo(Posts);
