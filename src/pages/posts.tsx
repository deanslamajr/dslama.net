import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Grid,
  ResponsiveContext,
  Text
} from 'grommet';

import { formatDate } from '../utils';
import {appTitle} from '../constants';
import {PostsPageEditModal} from '../components/editModals/posts';
import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import {useState as useEditModeState} from '../contexts/EditModeState';
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
        <title>{appTitle} - posts</title>
      </Head>
      <LoadingErrorOrRender<FetchPostsQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const postsPageData = queryResult.postsPage;
          const { posts, summary } = postsPageData;

          const [editModeState] = useEditModeState();

          return (
            <ResponsiveContext.Consumer>
              {responsive => {
                const isMobile = responsive === 'small';

                return (
                  <>
                    <Grid
                      columns={[
                        isMobile ? 'auto' : 'auto'
                      ]}
                      margin={{horizontal: "large"}}
                    >
                      <Box
                        direction="column"
                        align="center"
                        height="small"
                        pad="xlarge"
                      >
                        <Text
                          textAlign="center"
                          size="large"
                        >
                          {summary || ''}
                        </Text>
                      </Box>
                      <Grid
                        fill="horizontal"
                        gap="large"
                        rows="auto"
                        columns={['flex']}
                        justify="center"
                      >
                        {posts && posts.map((post, index) => (
                          <Card
                            key={post.title || `post-${index}`}
                            onClick={() => {
                              post.url && window.open(post.url, "_blank");
                            }}
                            height="full"
                            width={isMobile ? 'auto' : 'full'}
                            background="light-1"
                            hoverIndicator={true}
                          >
                            <CardHeader
                              alignSelf="center"
                              pad="large"
                            >
                              <Text
                                size="xlarge"
                                textAlign="center"
                              >
                              {post.title || ''}
                              </Text>
                            </CardHeader>
                            <CardBody pad="medium">
                              <Text
                                textAlign="justify"
                                size="medium">
                                {post.snippet || ''}
                              </Text>
                            </CardBody>
                            <CardFooter pad={{horizontal: "small"}} background="light-2">
                              <div>{formatDate(post.originalPublishDate)}</div>
                            </CardFooter>
                          </Card>                
                        ))}
                      </Grid>
                    </Grid>
                    {editModeState.showModal && (
                      <PostsPageEditModal
                        initialValues={postsPageData}
                      />
                    )}
                  </>
                )
              }}
            </ResponsiveContext.Consumer>
          );
        }}
      />
    </>
  );
};

export const getServerSideProps = getServerSidePropsFactory(FetchPostsDocument);

export default Posts;
