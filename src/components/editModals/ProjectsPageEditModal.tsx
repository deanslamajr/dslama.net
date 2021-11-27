import React from 'react';
import {ApolloError} from '@apollo/client';
import {
  Box,
  DateInput,
  Button,
  FormField,
  Text,
  TextArea,
  TextInput
} from "grommet";
import {
  Add,
  FormClose,
  FormTrash
} from 'grommet-icons'
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import createDecorator from 'final-form-focus'

import {
  ProjectsInput,
  UpdateProjectsPageMutationVariables,
  useUpdateProjectsPageMutation
} from '../../graphql/generated/ops';

import {useState as useEditModeState} from '../../contexts/EditModeState';
import {isRequired, isValidUrl, transformDateInputValueToGqlDate} from '../../utils';
import {Modal} from '../Modal';
import {LoginModal} from '../LoginModal';

import {
  FetchProjectsQuery,
  PostInput
} from '../../graphql/generated/ops';
import { FormApi } from 'final-form';

const focusOnErrors = createDecorator();

type MutableProject = Omit<
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

  // const augmentedInitialValues = React.useMemo(() => ({
  //   ...initialValues,
  //   newProjects: editModeState.postsFromConsole || []
  // }), [initialValues]);
  
  return (
    <FinalForm
      onSubmit={(values, form) => handleSubmit(values, form)}
      initialValues={initialValues}
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
                            <Box
                              key={name}
                              margin={{
                                top: 'small',
                                bottom: 'small'
                              }}  
                            >
                              <Field
                                name={`${name}.name`}
                                component="input"
                                validate={isRequired}
                              >
                                {({ input, meta }) => {
                                  return (
                                    <FormField
                                      label="name"
                                      error={meta.touched ? meta.error : undefined}
                                      margin={{bottom: 'xsmall'}}
                                    >
                                      <TextInput
                                        {...input}
                                        onChange={input.onChange}
                                        value={input.value}
                                        placeholder="This is a Contrived Project Name"
                                      />
                                    </FormField>
                                  );
                                }}
                              </Field>
                              <Field
                                name={`${name}.appUrl`}
                                component="input"
                                validate={isValidUrl}
                              >
                                {({ input, meta }) => {
                                  return (
                                    <FormField
                                      label="project url"
                                      error={meta.touched ? meta.error : undefined}
                                      margin={{bottom: 'xsmall'}}
                                    >
                                      <TextInput
                                        {...input}
                                        onChange={input.onChange}
                                        value={input.value}
                                        placeholder="https://someApp.dslama.net"
                                      />
                                    </FormField>
                                  );
                                }}
                              </Field>
                              <Field
                                name={`${name}.sourceUrl`}
                                component="input"
                                validate={isValidUrl}
                              >
                                {({ input, meta }) => {
                                  return (
                                    <FormField
                                      label="source url"
                                      error={meta.touched ? meta.error : undefined}
                                      margin={{bottom: 'xsmall'}}
                                    >
                                      <TextInput
                                        {...input}
                                        onChange={input.onChange}
                                        value={input.value}
                                        placeholder="https://www.github.com/deanslama/someAppName"
                                      />
                                    </FormField>
                                  );
                                }}
                              </Field>
                              <Field
                                name={`${name}.description`}
                                component="input"
                                validate={isRequired}
                              >
                                {({ input, meta }) => (
                                  <FormField
                                    label="description"
                                    error={meta.touched ? meta.error : undefined}
                                    width="full"
                                  >
                                    <TextArea
                                      {...input}
                                      onChange={input.onChange}
                                      value={input.value}
                                      rows={2}
                                    />
                                  </FormField>
                                )}
                              </Field>
                              <Field
                                name={`${name}.summary`}
                                component="input"
                                validate={isRequired}
                              >
                                {({ input, meta }) => (
                                  <FormField
                                    label="summary"
                                    error={meta.touched ? meta.error : undefined}
                                    width="full"
                                  >
                                    <TextArea
                                      {...input}
                                      onChange={input.onChange}
                                      value={input.value}
                                      rows={10}
                                    />
                                  </FormField>
                                )}
                              </Field>
                              <Field name={`${name}.originalPublishDate`}>
                                {({ input }) => (
                                  <FormField
                                    label="When was this originally published?"
                                    width="full"
                                  >
                                    <DateInput
                                      format="mm/dd/yyyy"
                                      value={input.value}
                                      onChange={({ value }) => input.onChange(value)}
                                    />
                                  </FormField>
                                )}
                              </Field>
                              <Button
                                secondary
                                hoverIndicator={true}
                                fill="horizontal"
                                onClick={() => fields.remove(index)}
                              >
                                <Box pad="xsmall" direction="row" align="center" gap="small">
                                  <FormClose color="brand"/>
                                  <Text>Cancel</Text>
                                </Box>
                              </Button>
                            </Box>
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
                          <Box
                            key={name}
                            margin={{
                              top: 'small',
                              bottom: 'small'
                            }}  
                          >
                            <Field
                              name={`${name}.name`}
                              component="input"
                            >
                              {({ input }) => {
                                return (
                                  <FormField
                                    label="project name"
                                    margin={{bottom: 'xsmall'}}
                                  >
                                    <TextInput
                                      {...input}
                                      onChange={input.onChange}
                                      value={input.value}
                                      placeholder="This is a Contrived Project Title"
                                    />
                                  </FormField>
                                );
                              }}
                            </Field>
                            <Field
                              name={`${name}.appUrl`}
                              component="input"
                              validate={isValidUrl}
                            >
                              {({ input, meta }) => {
                                return (
                                  <FormField
                                    label="project url"
                                    error={meta.submitError || meta.touched ? meta.error : undefined}
                                    margin={{bottom: 'xsmall'}}
                                  >
                                    <TextInput
                                      {...input}
                                      onChange={input.onChange}
                                      value={input.value}
                                      placeholder="https://www.someblog.com"
                                    />
                                  </FormField>
                                );
                              }}
                            </Field>
                            <Field
                              name={`${name}.sourceUrl`}
                              component="input"
                              validate={isValidUrl}
                            >
                              {({ input, meta }) => {
                                return (
                                  <FormField
                                    label="source url"
                                    error={meta.submitError || meta.touched ? meta.error : undefined}
                                    margin={{bottom: 'xsmall'}}
                                  >
                                    <TextInput
                                      {...input}
                                      onChange={input.onChange}
                                      value={input.value}
                                      placeholder="https://www.someblog.com"
                                    />
                                  </FormField>
                                );
                              }}
                            </Field>
                            <Field
                              name={`${name}.description`}
                              component="input"
                            >
                              {({ input }) => (
                                <FormField
                                  label="description"
                                  width="full"
                                >
                                  <TextArea
                                    {...input}
                                    onChange={input.onChange}
                                    value={input.value}
                                    rows={2}
                                  />
                                </FormField>
                              )}
                            </Field>
                            <Field
                              name={`${name}.summary`}
                              component="input"
                            >
                              {({ input }) => (
                                <FormField
                                  label="summary"
                                  width="full"
                                >
                                  <TextArea
                                    {...input}
                                    onChange={input.onChange}
                                    value={input.value}
                                    rows={10}
                                  />
                                </FormField>
                              )}
                            </Field>
                            <Button
                              secondary
                              hoverIndicator={true}
                              fill="horizontal"
                              onClick={() => fields.remove(index)}
                            >
                              <Box pad="xsmall" direction="row" align="center" gap="small">
                                <FormTrash color="brand"/>
                                <Text>Delete Project</Text>
                              </Box>
                            </Button>
                          </Box>
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