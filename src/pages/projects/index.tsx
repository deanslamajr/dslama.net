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
  useFetchProjectsQuery,
  FetchProjectsQuery,
} from '../../graphql/queries/fetchProjects.graphql';

const Projects: NextPage = () => {
  const { data, loading, error } = useFetchProjectsQuery();

  return (
    <LoadingErrorOrRender<FetchProjectsQuery>
      error={error}
      isLoading={loading}
      queryResult={data}
      render={({ queryResult }) => {
        const { getProjects } = queryResult as FetchProjectsQuery;

        console.log('projectsQuery', getProjects);

        return (
          <div>
            <Head>
              <title>dslama.net - projects</title>
            </Head>
            {/* <div>
              <Header summary={summary || ''} />
              {posts &&
                posts.map(post => (
                  <OuterContainer>
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
            </div> */}
          </div>
        );
      }}
    />
  );
};

export default withApollo(Projects);
