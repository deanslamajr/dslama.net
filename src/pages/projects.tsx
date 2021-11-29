import { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Anchor,
  Grid,
  ResponsiveContext,
  Text
} from 'grommet';

import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import {useState as useEditModeState} from '../contexts/EditModeState';
import {PostsPageEditModal} from '../components/editModals/projects'

import {appTitle} from '../constants';
import getServerSidePropsFactory from '../graphql/getServerSidePropsFactory';
import {
  useFetchProjectsQuery,
  FetchProjectsQuery,
  FetchProjectsDocument
} from '../graphql/generated/ops';

const Projects: NextPage = () => {
  const { data, loading, error } = useFetchProjectsQuery();

  return (
    <>
      <Head>
        <title>{appTitle} - projects</title>
      </Head>
      <LoadingErrorOrRender<FetchProjectsQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const projectsPageData = queryResult.projectsPage;
          const {
            projects,
            summary,
          } = projectsPageData;

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
                        {projects && projects.map((project, index) => (
                          <Card
                            key={project?.id || `project-${index}`}
                            height="full"
                            width={isMobile ? 'auto' : 'full'}
                            background="light-1"
                          >
                            <CardHeader
                              alignSelf="center"
                              pad={{top: 'large', bottom: 'small'}}
                              direction="row"
                              width="full"
                              justify="center"
                            >
                              <Anchor
                                size="xlarge"
                                onClick={() => {
                                  project?.appUrl && window.open(project.appUrl, "_blank");
                                }}
                              >
                              {project?.name || ''}
                              </Anchor>
                              {
                                  project?.sourceUrl && (
                                    <Anchor
                                      onClick={() => {
                                        project?.sourceUrl && window.open(project.sourceUrl, "_blank");
                                      }}
                                      margin={{left: 'small'}}
                                    >
                                      <div>source</div>
                                    </Anchor>
                                  )
                                }
                            </CardHeader>
                            <CardBody pad="medium">
                              <Text
                                size="large"
                                textAlign="center"
                                margin={{bottom: 'large'}}
                              >
                              {project?.description || ''}
                              </Text>
                              <Text
                                textAlign="justify"
                                size="medium">
                                {project?.summary || ''}
                              </Text>
                            </CardBody>
                          </Card>                
                        ))}
                      </Grid>
                    </Grid>
                    {editModeState.showModal && (
                      <PostsPageEditModal
                        initialValues={projectsPageData}
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

export const getServerSideProps = getServerSidePropsFactory(FetchProjectsDocument);

export default Projects;
