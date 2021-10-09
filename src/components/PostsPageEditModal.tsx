import React from 'react';
import {ApolloError} from '@apollo/client';
import {
  Box,
  Button,
  FormField,
  Text,
  TextArea,
  TextInput
} from "grommet";
import {
  Add,
  FormCheckmark,
  FormTrash
} from 'grommet-icons'
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import createDecorator from 'final-form-focus'

const focusOnErrors = createDecorator()

// import {useUpdateAboutPageMutation, UpdateAboutPageInput, UpdateAboutPageMutation} from '../../graphql/generated/ops';

import {useState as useEditModeState} from '../contexts/EditModeState';
import {isValidUrl} from '../utils';
import {LoadingErrorOrRender} from './LoadingErrorOrRender';
import {Modal} from './Modal';
import {LoginModal} from './LoginModal';

import {
  FetchPostsQuery
} from '../graphql/generated/ops';
import { FormApi } from 'final-form';

type Post = Required<
Omit<NonNullable<NonNullable<FetchPostsQuery['postsPage']['posts']>[number]>, '__typename'>
>;

const EMPTY_POST: Post = {
  url: '',
  originalPublishDate: '',
  title: '',
  snippet: ''
};

const initializeNewPost = (): Post => ({
  ...EMPTY_POST,
  originalPublishDate: Date.now()
})

type PostsPageEditModalProps = {
  initialValues: Omit<FetchPostsQuery['postsPage'], '__typename'>
}

export const PostsPageEditModal: React.FC<PostsPageEditModalProps> = ({
  initialValues
}) => {
  const [editModeState, setEditModeState] = useEditModeState();
  const [authenticationError, setError] = React.useState<ApolloError | undefined>(undefined);
  // const [updateAboutPage, {data, loading}] = useUpdateAboutPageMutation({
  //   onCompleted: (data) => {
  //     setEditModeState({
  //       ...editModeState,
  //       showModal: false
  //     })
  //   },
  //   onError: (error) => {     
  //     const isUnauthenticated = error.graphQLErrors.some(error => (
  //       error.extensions?.code === 'UNAUTHENTICATED'
  //     ));

  //     if (isUnauthenticated) {
  //       setError(error);
  //     }
  //   }
  // });

  const handleSubmit = async (values: Record<string, any>, form: FormApi) => {
    console.log('values', values)
    console.log('form', form)
    console.log('form.getState()', form.getState())
    // updateAboutPage({
    //   variables: {
    //     input: {
    //       ...values
    //     }
    //   }
    // });
  };

  const augmentedInitialValues = React.useMemo(() => ({
    ...initialValues,
    newPosts: []
  }), [initialValues]);
  
  return (
    <Modal
      onClose={() => setEditModeState({
        ...editModeState,
        showModal: false
      })}
    >
      {/* <LoadingErrorOrRender<UpdateAboutPageMutation>
        error={authenticationError}
        isLoading={loading}
        queryResult={data}
        render={({ queryResult }) => {
          return ( */}
            <FinalForm
              onSubmit={(values, form) => handleSubmit(values, form)}
              initialValues={augmentedInitialValues}
              mutators={{
                ...arrayMutators
              }}
              decorators={[ focusOnErrors ]} 
              render={({
                form,
                form: {
                  mutators: { push }
                }, 
                handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    align="start"
                    alignContent="center"
                    pad="large"
                    width="full"
                  >
                    <Field<string> name="summary">
                      {({ input, meta }) => {
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
                    <FormField
                      label="new posts"
                      contentProps={{
                        border: undefined,
                        fill: 'horizontal',
                        pad: {left: 'medium'}
                      }}
                      width="100%"
                    >
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
                      <FieldArray name="newPosts">
                        {({ fields }) => (
                          fields?.map((name, index) => (
                            <Box
                              key={fields.value[index].originalPublishDate}
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
                                  <Text>Remove Post</Text>
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
                      <FieldArray name="posts">
                        {({ fields }) => (
                          fields?.map((name, index) => (
                            <Box
                              key={fields.value[index].originalPublishDate}
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
                                  <Text>Remove Post</Text>
                                </Box>
                              </Button>
                            </Box>
                          ))
                        )}
                      </FieldArray>
                    </FormField>
                    
                    <Button
                      primary
                      fill
                      onClick={() => form.submit()}
                      alignSelf="center"
                      hoverIndicator={true}
                    >
                      <Box pad="small" direction="row" align="center" gap="small">
                        <FormCheckmark color="accent-1"/>
                        <Text textAlign="center">Save Changes</Text>
                      </Box>
                    </Button>
                  </Box>
                </form>
              )}
            />
          {/* );
        }}
        errorRender={(error) => <LoginModal onSuccessfulLogin={() => setError(undefined)} />}
      /> */}
    </Modal>
  );
}