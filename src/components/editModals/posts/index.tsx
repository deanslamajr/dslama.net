import React from 'react';
import {ApolloError} from '@apollo/client';
import {
  Box,
  Button,
  FormField,
  Text,
  TextInput as GrommetTextInput
} from "grommet";
import {Add} from 'grommet-icons'
import { FormApi } from 'final-form';
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import createDecorator from 'final-form-focus'

import {useState as useEditModeState} from '../../../contexts/EditModeState';
import {transformDateInputValueToGqlDate} from '../../../utils';
import {Modal} from '../../Modal';
import {LoginModal} from '../../LoginModal';
import {PostCard} from './PostCard';

import {
  FetchPostsQuery,
  PostInput,
  useUpdatePostsPageMutation
} from '../../../graphql/generated/ops';

const focusOnErrors = createDecorator();

export type MutablePost = Omit<
  NonNullable<FetchPostsQuery['postsPage']['posts']>[number],
  '__typename' | 'originalPublishDate'
> & {
  originalPublishDate: string;
};

const EMPTY_POST: MutablePost = {
  url: '',
  originalPublishDate: '',
  title: '',
  snippet: ''
};

const initializeNewPost = (): MutablePost => ({
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
      posts: MutablePost[];
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
      }: MutablePost): PostInput => ({
        originalPublishDate: transformDateInputValueToGqlDate(originalPublishDate),
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
    newPosts: editModeState.resolvedInputFromConsole?.posts || []
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
                          <GrommetTextInput
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
                      hoverIndicator={{color: "status-ok", opacity: 'weak'}}
                      fill="horizontal"
                      onClick={() => push('newPosts', initializeNewPost())}
                    >
                      <Box pad="xsmall" direction="row" align="center" gap="small">
                        <Add color="status-ok"/>
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
                            <PostCard
                              onRemoveCard={() => fields.remove(index)}
                              parentFieldName={name}
                              removeButtonLabel='Cancel'
                            />
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
                          <PostCard
                            onRemoveCard={() => fields.remove(index)}
                            parentFieldName={name}
                            removeButtonLabel='Delete Post'
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