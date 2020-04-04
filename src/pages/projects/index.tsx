import { NextPage } from 'next';
import Head from 'next/head';

import { LoadingErrorOrRender } from '../../components/LoadingErrorOrRender';
import { Header } from '../../components/header';
import {
  OuterContainer,
  Quote,
  ShadowCard,
  Title,
} from '../../components/Card';

import { Description, ProjectLink, SourceLink } from './Projects.styles';

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
        const {
          projects,
          summary,
        } = (queryResult as FetchProjectsQuery).projectsPage;

        return (
          <div>
            <Head>
              <title>dslama.net - projects</title>
            </Head>
            <div>
              <Header summary={summary || ''} />
              {projects &&
                projects.map(project => (
                  <OuterContainer key={project?.id}>
                    <ShadowCard>
                      <Title>
                        <ProjectLink
                          href={project?.appUrl || ''}
                          target="_blank">
                          {project?.name}
                        </ProjectLink>
                        {project?.sourceUrl && (
                          <>
                            -
                            <SourceLink
                              href={project.sourceUrl}
                              target="_blank">
                              source
                            </SourceLink>
                          </>
                        )}
                      </Title>
                      <Description>{project?.description}</Description>
                      <Quote
                        dangerouslySetInnerHTML={{
                          __html: project?.summary || '',
                        }}
                      />
                    </ShadowCard>
                  </OuterContainer>
                ))}
            </div>
          </div>
        );
      }}
    />
  );
};

export default withApollo(Projects);
