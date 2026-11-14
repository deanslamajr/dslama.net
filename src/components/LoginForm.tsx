import React from 'react';
import { Box, FormField, Text, TextInput } from 'grommet';
import { Field } from 'react-final-form';

import {
  useAttemptLoginMutation,
  AttemptLoginInput,
} from '../graphql/generated/ops';

export const initialLoginValues: AttemptLoginInput = {
  username: '',
  password: '',
};

// Shared by the login modal and the /login page.
type UseLogin = (params: {
  message?: string;
  onSuccessfulLogin: () => void;
}) => {
  loading: boolean;
  onSubmit: (values: AttemptLoginInput) => void;
  displayMessage: string;
};

export const useLogin: UseLogin = ({ message, onSuccessfulLogin }) => {
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

  const onSubmit = (values: AttemptLoginInput) => {
    attemptLogin({
      variables: {
        input: {
          username: values.username,
          password: values.password,
        },
      },
    });
  };

  const displayMessage =
    errorMessage ||
    (hasIncorrectCreds ? 'Login Failed! Try Again.' : message || '');

  return { loading, onSubmit, displayMessage };
};

export const LoginFields: React.FC<{ message: string }> = ({ message }) => (
  <>
    <Box justify="center" width="100%">
      <Text alignSelf="center" color="status-error" role="status">
        {message}
      </Text>
    </Box>
    <Field<string> name="username">
      {({ input }) => (
        <FormField label="username" htmlFor="login-username">
          <TextInput
            {...input}
            id="login-username"
            autoComplete="username"
            onChange={input.onChange}
            value={input.value}
          />
        </FormField>
      )}
    </Field>
    <Field<string> name="password">
      {({ input }) => (
        <FormField label="password" htmlFor="login-password">
          <TextInput
            {...input}
            id="login-password"
            type="password"
            autoComplete="current-password"
            onChange={input.onChange}
            value={input.value}
          />
        </FormField>
      )}
    </Field>
  </>
);
