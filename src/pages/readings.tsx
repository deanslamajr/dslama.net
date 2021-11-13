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
import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
// import {useState as useEditModeState} from '../contexts/EditModeState';

import getServerSidePropsFactory from '../graphql/getServerSidePropsFactory';
import {
  useFetchReadingsQuery,
  FetchReadingsQuery,
  FetchReadingsDocument
} from '../graphql/generated/ops';

const ReadingsPage: NextPage = () => {
  const { data, loading, error } = useFetchReadingsQuery();

  return (
    <>
      <Head>
        <title>{appTitle} - projects</title>
      </Head>
      <LoadingErrorOrRender<FetchReadingsQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const {
            readings,
            summary,
          } = queryResult.readingsPage;

          // const [editModeState] = useEditModeState();

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
                        {readings && readings.map((reading, index) => (
                          <Card
                            key={reading?.id || `reading-${index}`}
                            onClick={() => {
                              reading?.url && window.open(reading.url, "_blank");
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
                              {reading?.title || ''}
                              </Text>
                            </CardHeader>
                            <CardBody pad="medium">
                              <Text
                                textAlign="justify"
                                size="medium">
                                {reading?.quote || ''}
                              </Text>
                            </CardBody>
                            <CardFooter pad={{horizontal: "small"}} background="light-2">
                              <div>{`${reading?.author} @ ${reading?.publication}`}</div>
                              <div>{formatDate(reading?.publishDate)}</div>
                            </CardFooter>
                          </Card>                
                        ))}
                      </Grid>
                    </Grid>
                    {/* {editModeState.showModal && (
                      <PostsPageEditModal
                        initialValues={postsPageData}
                      />
                    )} */}
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

export const getServerSideProps = getServerSidePropsFactory(FetchReadingsDocument);

export default ReadingsPage;
