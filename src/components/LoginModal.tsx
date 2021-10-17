import React from 'react';
import {Box, FormField, Text, TextInput} from "grommet";
import { Form as FinalForm, Field } from 'react-final-form';

import {useAttemptLoginMutation, AttemptLoginInput} from '../graphql/generated/ops';

import {Modal} from './Modal';

const initialValues: AttemptLoginInput = {
  username: '',
  password: ''
};

type LoginModalProps = {
  message?: string;
  onCloseClick: () => void;
  onSuccessfulLogin: () => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({
  message,
  onCloseClick,
  onSuccessfulLogin
}) => {
  const [hasIncorrectCreds, setHasIncorrectCreds] = React.useState(false);
  const [attemptLogin, {data, loading}] = useAttemptLoginMutation({
    onCompleted: (data) => {
      if (data.attemptLogin.wasSuccessful) {
        onSuccessfulLogin();
      } else {
        setHasIncorrectCreds(true);
      }
    }
  });

  const handleSubmit = (values: Record<string, any>) => {
    attemptLogin({
      variables: {
        input: {
          username: values.username,
          password: values.password
        }
      }
    });
  };

  const getMessage = () => (
    hasIncorrectCreds
      ? 'Login Failed! Try Again.'
      : message || ''
  );

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
          primaryButtonLabel="Login"
        >
          <form onSubmit={handleSubmit}>
            <Box
              justify="center"
              width="100%"
            >
              <Text
                alignSelf="center"
                color="status-error"
              >
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
}