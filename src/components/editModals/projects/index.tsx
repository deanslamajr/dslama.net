import React from 'react';
import {ApolloError} from '@apollo/client';
import {
  Box,
  Button,
  FormField,
  Text,
  TextInput
} from "grommet";
import {Add} from 'grommet-icons'
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import createDecorator from 'final-form-focus'
import { FormApi } from 'final-form';

import {useState as useEditModeState} from '../../../contexts/EditModeState';
import {transformGqlDateForDateInput, transformDateInputValueToGqlDate} from '../../../utils';
import {Modal} from '../../Modal';
import {LoginModal} from '../../LoginModal';
import {ProjectCard} from './ProjectCard';

import {
  FetchProjectsQuery,
  ProjectsInput,
  UpdateProjectsPageMutationVariables,
  useUpdateProjectsPageMutation
} from '../../../graphql/generated/ops';

const focusOnErrors = createDecorator();

export type MutableProject = Omit<
  NonNullable<FetchProjectsQuery['projectsPage']['projects']>[number],
  'id' | '__typename' | 'originalPublishDate'
>  & {
  originalPublishDate: string;
};

const EMPTY_PROJECT: MutableProject = {
  originalPublishDate: '',
  name: '',
  description: '',
  summary: '',
  appUrl: '',
  sourceUrl: ''
};

const initializeNewProject = (): MutableProject => ({
  ...EMPTY_PROJECT,
  originalPublishDate: (new Date(Date.now())).toISOString()
})

type PostsPageEditModalProps = {
  initialValues: FetchProjectsQuery['projectsPage'];
};

export const PostsPageEditModal: React.FC<PostsPageEditModalProps> = ({
  initialValues
}) => {
  const [editModeState, setEditModeState] = useEditModeState();
  const [authenticationError, setError] = React.useState<ApolloError | undefined>(undefined);

  const closeModal = React.useCallback(() => {
    setEditModeState({
      ...editModeState,
      showModal: false
    });
  }, [editModeState, setEditModeState]);

  const [updateProjectsPage, {loading}] = useUpdateProjectsPageMutation({
    onCompleted: () => {
      closeModal()
    },
    onError: (error) => {     
      const isUnauthenticated = error.graphQLErrors.some(error => (
        error.extensions?.code === 'UNAUTHENTICATED'
      ));

      if (isUnauthenticated) {
        setError(error);
      }
    }
  });

  const handleSubmit = async (values: Record<string, any>, form: FormApi) => {
    type Values = {
      newProjects: MutableProject[];
      projects: MutableProject[];
      summary: string;
    };

    const transformFormValuesForMutationPayload = ({
      newProjects,
      projects,
      summary
    }: Values): UpdateProjectsPageMutationVariables => {
      const transformProject = ({
        name,
        originalPublishDate,
        description,
        summary,
        appUrl,
        sourceUrl
      }: MutableProject): ProjectsInput => ({
        originalPublishDate: transformDateInputValueToGqlDate(originalPublishDate),
        name,
        description,
        summary,
        appUrl,
        sourceUrl
      });

      return {
        input: {
          projects: [
            ...projects.map(transformProject),
            ...newProjects.map(transformProject)
          ],
          summary
        }
      }
    };

    const mutationInput = transformFormValuesForMutationPayload(values as Values);

    updateProjectsPage({
      variables: mutationInput
    });
  };

  type InitialValues = {
    summary: string;
    newProjects: MutableProject[];
    projects: MutableProject[];
  };

  const augmentedInitialValues = React.useMemo<InitialValues>(() => {
    const summary = initialValues.summary || '';

    const existingProjects: MutableProject[] = initialValues.projects?.map((project) => {
      return {
        name: project.name,
        originalPublishDate: transformGqlDateForDateInput(project.originalPublishDate),
        description: project.description,
        appUrl: project.appUrl,
        sourceUrl: project.sourceUrl,
        summary: project.summary
      }
    }) || [] as MutableProject[];

    return {
      summary,
      newProjects: editModeState.resolvedInputFromConsole?.projects || [],
      projects: existingProjects
    };
  }, [initialValues]);
  
  return (
    <FinalForm
      onSubmit={(values, form) => handleSubmit(values, form)}
      initialValues={augmentedInitialValues}
      mutators={{
        ...arrayMutators
      }}
      subscription={{ pristine: true }}
      decorators={[ focusOnErrors ]} 
      render={({
        form,
        form: {
          mutators: { push }
        }, 
        handleSubmit,
        pristine
      }) => (
        authenticationError
          ? (
            <LoginModal
              message="Unauthenticated! Please login and try again."
              onSuccessfulLogin={() => setError(undefined)}
              onCloseClick={() => setError(undefined)}
            />
          )
          : (
            <Modal
              disableSave={pristine}
              isLoading={loading}
              onSaveClick={() => form.submit()}
              onClose={() => closeModal()}
            >
              <form onSubmit={handleSubmit}>
                <Box
                  align="start"
                  alignContent="center"
                  pad="large"
                  width="full"
                >
                  <Field<string> name="summary">
                    {({ input }) => {
                      return (
                        <FormField
                          label="page summary"
                          width="full"
                        >
                          <TextInput
                            {...input}
                            placeholder="What is this page about?"
                            onChange={input.onChange}
                            value={input.value}
                          />
                        </FormField>
                      );
                    }}
                  </Field>
                    <Button
                      secondary
                      hoverIndicator={true}
                      fill="horizontal"
                      onClick={() => push('newProjects', initializeNewProject())}
                    >
                      <Box pad="xsmall" direction="row" align="center" gap="small">
                        <Add color="brand"/>
                        <Text>Add Project</Text>
                      </Box>
                    </Button>
                    <FormField
                      contentProps={{
                        border: undefined,
                        fill: 'horizontal',
                        pad: {left: 'medium'}
                      }}
                      width="100%"
                    >
                      <FieldArray
                        name="newProjects"
                        subscription={{}}
                      >
                        {({ fields }) => (
                          fields.map((name, index) => (
                            <ProjectCard
                              onRemoveCard={() => fields.remove(index)}
                              parentFieldName={name}
                              removeButtonLabel='Cancel'
                            />
                          ))
                        )}
                      </FieldArray>
                    </FormField>  
                  <FormField
                    label="edit existing projects"
                    contentProps={{
                      border: undefined,
                      fill: 'horizontal',
                      pad: {left: 'medium'}
                    }}
                    width="100%"
                  >
                    <FieldArray
                      name="projects"
                      subscription={{}}  
                    >
                      {({ fields }) => (
                        fields?.map((name, index) => (
                          <ProjectCard
                            onRemoveCard={() => fields.remove(index)}
                            parentFieldName={name}
                            removeButtonLabel='Delete Project'
                          />
                        ))
                      )}
                    </FieldArray>
                  </FormField>
                </Box>
              </form>
            </Modal>
          )
      )}
    />
  );
}