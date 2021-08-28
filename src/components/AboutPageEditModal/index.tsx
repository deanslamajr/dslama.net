import React from 'react';
import { Button, Form, TextField } from 'grape-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

import {Modal} from '../Modal';

const initialValues = {
  title: 'initial value'
};

export const AboutPageEditModal: React.FC<{}> = ({}) => {
  const handleSubmit = (values) => {
    console.log('values', values);
  };
  
  return (<Modal>
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
  </Modal>);
}