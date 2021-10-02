import React from 'react';
import {Button, FormField, Spinner, TextInput} from "grommet";
import { Form as FinalForm, Field } from 'react-final-form';

import {useAttemptLoginMutation, AttemptLoginInput} from '../graphql/generated/ops';

import {Modal} from './Modal';

const initialValues: AttemptLoginInput = {
  username: '',
  password: ''
};

type LoginFormProps = {
  message?: string;
  onSubmit: ReturnType<typeof useAttemptLoginMutation>[0];
};

const LoginForm: React.FC<LoginFormProps> = ({
  message = '',
  onSubmit
}) => {
  const handleSubmit = (values: Record<string, any>) => {
    onSubmit({
      variables: {
        input: {
          username: values.username,
          password: values.password
        }
      }
    });
  };

  return (
    <FinalForm
      onSubmit={values => handleSubmit(values)}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, submitting, valid }) => (
        <form onSubmit={handleSubmit}>
          <div>{message}</div>
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
          <Button
            type="submit"
            disabled={pristine || submitting || !valid}
          >
            Login
          </Button>
        </form>
      )}
    />
  )
}

type LoginModalProps = {
  onSuccessfulLogin: () => void;
};

export const LoginModal: React.FC<LoginModalProps> = ({
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

  return (<Modal>
    <div>Login Modal</div>
    <LoginForm
      message={hasIncorrectCreds ? "Login Failed! Try Again." : undefined}
      onSubmit={attemptLogin}
    />
    {
      loading ? <Spinner /> : null
    }
  </Modal>);
}