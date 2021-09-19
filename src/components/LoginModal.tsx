import React from 'react';
import { Button, Form, Progress, TextField } from 'grape-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

import {useAttemptLoginMutation, AttemptLoginInput, AttemptLoginMutation} from '../graphql/generated/ops';

import {LoadingErrorOrRender} from './LoadingErrorOrRender';
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
        <Form onSubmit={handleSubmit}>
          <div>{message}</div>
          <Field<string> name="username">
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
          <Field<string> name="password">
            {({ input, meta }) => {
              return (
                <TextField
                {...input}
                type="password"
                onChange={input.onChange}
                value={input.value}
                />
              );
            }}
          </Field>
          <Button
            type="submit"
            disabled={pristine || submitting || !valid}
          >
            Login
          </Button>
        </Form>
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
      loading ? <Progress progressType="circular"/> : null
    }
  </Modal>);
}