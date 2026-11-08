import { NextPage } from 'next';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Anchor,
  Grid,
  ResponsiveContext,
  Text,
} from 'grommet';

import { LoadingErrorOrRender } from '../components/LoadingErrorOrRender';
import { SeoHead } from '../components/SeoHead';
import { useState as useEditModeState } from '../contexts/EditModeState';
import { ProjectsPageEditModal } from '../components/editModals/projects';

import { appTitle } from '../constants';
import getServerSidePropsFactory from '../graphql/getServerSidePropsFactory';
import {
  useFetchProjectsQuery,
  FetchProjectsQuery,
  FetchProjectsDocument,
} from '../graphql/generated/ops';

const Projects: NextPage = () => {
  const { data, loading, error } = useFetchProjectsQuery();
  const [editModeState] = useEditModeState();

  return (
    <>
      <SeoHead
        title={`${appTitle} - projects`}
        description={data?.projectsPage.summary || ''}
        path="/projects"
      />
      <LoadingErrorOrRender<FetchProjectsQuery>
        error={error}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          const projectsPageData = queryResult.projectsPage;
          const { projects, summary } = projectsPageData;

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
                        {projects &&
                          projects.map((project, index) => (
                            <Card
                              key={project?.id || `project-${index}`}
                              height="full"
                              width={isMobile ? 'auto' : 'full'}
                              background="light-1">
                              <CardHeader
                                alignSelf="center"
                                pad={{ top: 'large', bottom: 'small' }}
                                direction="row"
                                width="full"
                                justify="center">
                                <Anchor
                                  size="xlarge"
                                  href={project?.appUrl}
                                  target="_blank"
                                  rel="noopener noreferrer">
                                  {project?.name || ''}
                                </Anchor>
                                {project?.sourceUrl && (
                                  <Anchor
                                    href={project.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    margin={{ left: 'small' }}>
                                    <div>source</div>
                                  </Anchor>
                                )}
                              </CardHeader>
                              <CardBody pad="medium">
                                <Text
                                  size="large"
                                  textAlign="center"
                                  margin={{ bottom: 'large' }}>
                                  {project?.description || ''}
                                </Text>
                                <Text textAlign="justify" size="medium">
                                  {project?.summary || ''}
                                </Text>
                              </CardBody>
                            </Card>
                          ))}
                      </Grid>
                    </Grid>
                    {editModeState.showModal && (
                      <ProjectsPageEditModal initialValues={projectsPageData} />
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
  FetchProjectsDocument
);

export default Projects;
