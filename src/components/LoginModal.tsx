import React from 'react';
import { Box, FormField, Text, TextInput } from 'grommet';
import { Form as FinalForm, Field } from 'react-final-form';

import {
  useAttemptLoginMutation,
  AttemptLoginInput,
} from '../graphql/generated/ops';

import { Modal } from './Modal';

const initialValues: AttemptLoginInput = {
  username: '',
  password: '',
};

type LoginModalProps = {
  message?: string;
  onCloseClick: () => void;
  onSuccessfulLogin: () => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({
  message,
  onCloseClick,
  onSuccessfulLogin,
}) => {
  const [hasIncorrectCreds, setHasIncorrectCreds] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>(
    undefined
  );
  const [attemptLogin, { loading }] = useAttemptLoginMutation({
    refetchQueries: ['FetchViewer'],
    onCompleted: data => {
      setErrorMessage(undefined);
      if (data.attemptLogin.wasSuccessful) {
        onSuccessfulLogin();
      } else {
        setHasIncorrectCreds(true);
      }
    },
    onError: error => {
      const isRateLimited = error.graphQLErrors.some(
        e => e.extensions?.code === 'RATE_LIMITED'
      );
      setErrorMessage(
        isRateLimited
          ? 'Too many login attempts. Wait 15 minutes and try again.'
          : 'Login failed. Try again.'
      );
    },
  });

  const handleSubmit = (values: Record<string, any>) => {
    attemptLogin({
      variables: {
        input: {
          username: values.username,
          password: values.password,
        },
      },
    });
  };

  const getMessage = () =>
    errorMessage ||
    (hasIncorrectCreds ? 'Login Failed! Try Again.' : message || '');

  return (
    <FinalForm
      onSubmit={values => handleSubmit(values)}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, submitting, valid }) => (
        <Modal
          disableSave={pristine || submitting || !valid}
          isLoading={loading}
          onSaveClick={handleSubmit}
          onClose={onCloseClick}
          primaryButtonLabel="Login">
          <form onSubmit={handleSubmit}>
            <Box justify="center" width="100%">
              <Text alignSelf="center" color="status-error">
                {getMessage()}
              </Text>
            </Box>
            <Field<string> name="username">
              {({ input, meta }) => {
                return (
                  <FormField label="username">
                    <TextInput
                      {...input}
                      onChange={input.onChange}
                      value={input.value}
                    />
                  </FormField>
                );
              }}
            </Field>
            <Field<string> name="password">
              {({ input, meta }) => {
                return (
                  <FormField label="password">
                    <TextInput
                      {...input}
                      type="password"
                      onChange={input.onChange}
                      value={input.value}
                    />
                  </FormField>
                );
              }}
            </Field>
          </form>
        </Modal>
      )}
    />
  );
};
