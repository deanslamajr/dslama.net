import React from 'react';
import { Button, Form, Progress, TextField } from 'grape-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

import {useUpdateAboutPageMutation, UpdateAboutPageInput} from '../../graphql/mutations/updateAboutPage.graphql';

import {Modal} from '../Modal';

const initialValues = {
  title: 'initial value'
};

export const AboutPageEditModal: React.FC<{}> = ({}) => {
  const [updateAboutPage, {loading, error}] = useUpdateAboutPageMutation();

  const handleSubmit = (values) => {
    updateAboutPage({
      variables: {
        input: {
          title: values.title
        }
      }
    });
  };
  
  return (<Modal>
    {loading
      ? <Progress progressType="circular" />
      : <FinalForm
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
    }
  </Modal>);
}