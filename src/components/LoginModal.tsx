import React from 'react';
import { Button, Form, Progress, TextField } from 'grape-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

import {LoadingErrorOrRender} from './LoadingErrorOrRender';
import {Modal} from './Modal';

const initialValues = {
  title: 'initial value'
};

export const LoginModal: React.FC<{}> = ({}) => { 
  return (<Modal>
    <div>Login Modal</div>
    {/* <LoadingErrorOrRender<UpdateAboutPageMutation>
      error={error}
      isLoading={loading}
      queryResult={data}
      render={({ queryResult }) => {
        console.log('queryResult', queryResult)

        return (
          <FinalForm
            onSubmit={values => handleSubmit(values)}
            initialValues={initialValues}
            render={({ form, valid }) => (
              <Form>
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
                <Button onClick={() => form.submit()}>
                  Save Changes
                </Button>
              </Form>
            )}
          />
        );
      }}
      errorRender={(error) => <LoginForm />}
    /> */}
  </Modal>);
}