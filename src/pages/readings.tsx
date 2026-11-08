import { NextPage } from 'next';
import {
  Anchor,
  Box,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Grid,
  ResponsiveContext,
  Text,
} from 'grommet';

import { formatDate } from '../utils';
import { appTitle } from '../constants';
import { useState as useEditModeState } from '../contexts/EditModeState';

import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import { SeoHead } from '../components/SeoHead';
import { ReadingsPageEditModal } from '../components/editModals/readings';

import getServerSidePropsFactory from '../graphql/getServerSidePropsFactory';
import {
  useFetchReadingsQuery,
  FetchReadingsQuery,
  FetchReadingsDocument,
} from '../graphql/generated/ops';

const ReadingsPage: NextPage = () => {
  const { data, loading, error } = useFetchReadingsQuery();
  const [editModeState] = useEditModeState();

  return (
    <>
      <SeoHead
        title={`${appTitle} - readings`}
        description={data?.readingsPage.summary || ''}
        path="/readings"
      />
      <LoadingErrorOrRender<FetchReadingsQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const { readings, summary } = queryResult.readingsPage;

          return (
            <ResponsiveContext.Consumer>
              {responsive => {
                const isMobile = responsive === 'small';

                return (
                  <>
                    <Grid
                      columns={[isMobile ? 'auto' : 'auto']}
                      margin={{ horizontal: 'large' }}>
                      <Box
                        direction="column"
                        align="center"
                        height="small"
                        pad="xlarge">
                        <Text textAlign="center" size="large">
                          {summary || ''}
                        </Text>
                      </Box>
                      <Grid
                        fill="horizontal"
                        gap="large"
                        rows="auto"
                        columns={['flex']}
                        justify="center">
                        {readings &&
                          readings.map((reading, index) => (
                            <Card
                              key={reading?.id || `reading-${index}`}
                              height="full"
                              width={isMobile ? 'auto' : 'full'}
                              background="light-1">
                              <CardHeader alignSelf="center" pad="large">
                                <Anchor
                                  href={reading?.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  label={reading?.title}
                                  size="xlarge"
                                  style={{ textAlign: 'center' }}
                                />
                              </CardHeader>
                              <CardBody pad="medium">
                                <Text textAlign="justify" size="medium">
                                  {reading?.quote || ''}
                                </Text>
                              </CardBody>
                              <CardFooter
                                pad={{ horizontal: 'small' }}
                                background="light-2">
                                <div>{`${reading?.author} @ ${reading?.publication}`}</div>
                                <div>{formatDate(reading?.publishDate)}</div>
                              </CardFooter>
                            </Card>
                          ))}
                      </Grid>
                    </Grid>
                    {editModeState.showModal && (
                      <ReadingsPageEditModal
                        initialValues={queryResult.readingsPage}
                      />
                    )}
                  </>
                );
              }}
            </ResponsiveContext.Consumer>
          );
        }}
      />
    </>
  );
};

export const getServerSideProps = getServerSidePropsFactory(
  FetchReadingsDocument
);

export default ReadingsPage;
