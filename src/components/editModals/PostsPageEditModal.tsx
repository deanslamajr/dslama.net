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

import {useUpdatePostsPageMutation} from '../../graphql/generated/ops';

import {useState as useEditModeState} from '../../contexts/EditModeState';
import {isRequired, isValidUrl} from '../../utils';
import {Modal} from '../Modal';
import {LoginModal} from '../LoginModal';

import {
  FetchPostsQuery,
  PostInput
} from '../../graphql/generated/ops';
import { FormApi } from 'final-form';

const focusOnErrors = createDecorator();

type Post = NonNullable<FetchPostsQuery['postsPage']['posts']>[number];

const EMPTY_POST: PostInput = {
  url: '',
  originalPublishDate: 0,
  title: '',
  snippet: ''
};

const initializeNewPost = (): PostInput => ({
  ...EMPTY_POST,
  originalPublishDate: (new Date(Date.now())).toISOString()
})

type PostsPageEditModalProps = {
  initialValues: Omit<FetchPostsQuery['postsPage'], '__typename'>
}

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

  const [updatePostsPage, {loading}] = useUpdatePostsPageMutation({
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
      newPosts: Array<{
        originalPublishDate: string;
        snippet: string;
        title: string;
        url: string;
      }>;
      posts: PostInput[];
      summary: string;
    };
    const transformFormValuesForMutationPayload = ({
      newPosts,
      posts,
      summary
    }: Values) => {
      const transformPost = ({
        originalPublishDate,
        snippet,
        title,
        url
      }: Post) => ({
        originalPublishDate,
        snippet,
        title,
        url
      });

      return {
        input: {
          posts: [
            ...newPosts.map(transformPost),
            ...posts.map(transformPost)
          ],
          summary
        }
      }
    };

    const mutationInput = transformFormValuesForMutationPayload(values as Values);

    updatePostsPage({
      variables: mutationInput
    });
  };

  const augmentedInitialValues = React.useMemo(() => ({
    ...initialValues,
    newPosts: editModeState.postsFromConsole || []
  }), [initialValues]);
  
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
                      onClick={() => push('newPosts', initializeNewPost())}
                    >
                      <Box pad="xsmall" direction="row" align="center" gap="small">
                        <Add color="brand"/>
                        <Text>Add Post</Text>
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
                        name="newPosts"
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
                                name={`${name}.title`}
                                component="input"
                                validate={isRequired}
                              >
                                {({ input, meta }) => {
                                  return (
                                    <FormField
                                      label="title"
                                      error={meta.touched ? meta.error : undefined}
                                      margin={{bottom: 'xsmall'}}
                                    >
                                      <TextInput
                                        {...input}
                                        onChange={input.onChange}
                                        value={input.value}
                                        placeholder="This is a Contrived Title"
                                      />
                                    </FormField>
                                  );
                                }}
                              </Field>
                              <Field
                                name={`${name}.url`}
                                component="input"
                                validate={isValidUrl}
                              >
                                {({ input, meta }) => {
                                  return (
                                    <FormField
                                      label="url"
                                      error={meta.touched ? meta.error : undefined}
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
                                name={`${name}.snippet`}
                                component="input"
                                validate={isRequired}
                              >
                                {({ input, meta }) => (
                                  <FormField
                                    label="snippet"
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
                    label="edit existing posts"
                    contentProps={{
                      border: undefined,
                      fill: 'horizontal',
                      pad: {left: 'medium'}
                    }}
                    width="100%"
                  >
                    <FieldArray
                      name="posts"
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
                              name={`${name}.title`}
                              component="input"
                            >
                              {({ input }) => {
                                return (
                                  <FormField
                                    label="title"
                                    margin={{bottom: 'xsmall'}}
                                  >
                                    <TextInput
                                      {...input}
                                      onChange={input.onChange}
                                      value={input.value}
                                      placeholder="This is a Contrived Title"
                                    />
                                  </FormField>
                                );
                              }}
                            </Field>
                            <Field
                              name={`${name}.url`}
                              component="input"
                              validate={isValidUrl}
                            >
                              {({ input, meta }) => {
                                return (
                                  <FormField
                                    label="url"
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
                              name={`${name}.snippet`}
                              component="input"
                            >
                              {({ input }) => (
                                <FormField
                                  label="snippet"
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
                                <Text>Delete Post</Text>
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