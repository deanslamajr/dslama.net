import React from 'react';
import {ApolloError} from '@apollo/client';
import { Button, Form, Progress, TextField } from 'grape-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import {useUpdateAboutPageMutation, UpdateAboutPageInput, UpdateAboutPageMutation} from '../../graphql/generated/ops';

import {useState as useEditModeState} from '../../contexts/EditModeState';

import {LoadingErrorOrRender} from '../LoadingErrorOrRender';
import {Modal} from '../Modal';
import {LoginModal} from '../LoginModal';

function isValidUrl(potentialUrl: string) {
  let errorMessage: string | undefined = undefined;
  
  try {
    new URL(potentialUrl);
  } catch (_) {
    errorMessage = 'Must be valid url e.g. https://google.com';
  }

  return errorMessage;
}

type AboutPageEditModalProps = {
  initialValues: {
    links?: Array<{
      name: string;
      url: string;
    }>;
    pictureURL: string;
    bio: string;
    title: string;
  }
}

export const AboutPageEditModal: React.FC<AboutPageEditModalProps> = ({
  initialValues
}) => {
  const [editModeState, setEditModeState] = useEditModeState();
  const [authenticationError, setError] = React.useState<ApolloError | undefined>(undefined);
  const [updateAboutPage, {data, loading}] = useUpdateAboutPageMutation({
    onCompleted: (data) => {
      setEditModeState({
        ...editModeState,
        showModal: false
      })
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

  const handleSubmit = async (values: Record<string, any>) => {
    console.log('values', values)
    updateAboutPage({
      variables: {
        input: {
          ...values
        }
      }
    });
  };
  
  return (<Modal>
    <LoadingErrorOrRender<UpdateAboutPageMutation>
      error={authenticationError}
      isLoading={loading}
      queryResult={data}
      render={({ queryResult }) => {
        return (
          <FinalForm
            onSubmit={values => handleSubmit(values)}
            initialValues={initialValues}
            mutators={{
              ...arrayMutators
            }}
            render={({
              form,
              form: {
                mutators: { push, pop }
              }, 
              handleSubmit
            }) => (
              <Form onSubmit={handleSubmit}>
                <Field<string> name="title">
                  {({ input, meta }) => {
                    return (
                      <TextField
                        {...input}
                        type="text"
                        onChange={input.onChange}
                        value={input.value}
                      />
                    );
                  }}
                </Field>
                <div>
                  <div>Links</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => push('links', undefined)}
                    >
                      Add Link
                    </button>
                  </div>
                  <FieldArray name="links">
                    {({ fields }) =>
                      (fields && fields.length)
                        ? fields.map((name, index) => (
                          <div key={name}>
                            <label>{index + 1}</label>
                            <Field
                              name={`${name}.name`}
                              component="input"
                            >
                              {({ input, meta }) => {
                                return (
                                  <TextField
                                    {...input}
                                    type="text"
                                    onChange={input.onChange}
                                    value={input.value}
                                    placeholder="Generic Socialmedia Platform"
                                  />
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
                                  <div>
                                    <TextField
                                      {...input}
                                      type="text"
                                      onChange={input.onChange}
                                      value={input.value}
                                      placeholder="https://www.socialmedia.com"
                                    />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                                );
                              }}
                            </Field>
                            <span
                              onClick={() => fields.remove(index)}
                              style={{ cursor: 'pointer' }}
                            >
                              ❌
                            </span>
                          </div>
                        ))
                        : <div>No Links</div>
                    }
                  </FieldArray>
                </div>
                <Field<string> name="pictureURL">
                  {({ input, meta }) => {
                    return (
                      <TextField
                        {...input}
                        type="text"
                        onChange={input.onChange}
                        value={input.value}
                      />
                    );
                  }}
                </Field>
                <Field<string> name="bio">
                  {({ input, meta }) => {
                    return (
                      <TextField
                        {...input}
                        type="text"
                        onChange={input.onChange}
                        value={input.value}
                      />
                    );
                  }}
                </Field>
                <Button onClick={() => form.submit()}>
                  Save Changes
                </Button>
              </Form>
            )}
          />
        );
      }}
      errorRender={(error) => <LoginModal onSuccessfulLogin={() => setError(undefined)} />}
    />
  </Modal>);
}