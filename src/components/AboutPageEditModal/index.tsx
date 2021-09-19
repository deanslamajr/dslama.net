import React from 'react';
import { Button, Form, Progress, TextField } from 'grape-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

import {useUpdateAboutPageMutation, UpdateAboutPageInput, UpdateAboutPageMutation} from '../../graphql/generated/ops';

import {useState as useEditModeState} from '../../contexts/EditModeState';

import {LoadingErrorOrRender} from '../LoadingErrorOrRender';
import {Modal} from '../Modal';
import {LoginModal} from '../LoginModal';

const initialValues = {
  title: 'initial value'
};

export const AboutPageEditModal: React.FC<{}> = ({}) => {
  const [editModeState, setEditModeState] = useEditModeState();
  const [requiresLogin, setRequiresLogin] = React.useState(false);
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
        setRequiresLogin(true);
      }
    }
  });

  const handleSubmit = async (values: Record<string, any>) => {
    updateAboutPage({
      variables: {
        input: {
          title: values.title
        }
      }
    });
  };
  
  return (<Modal>
    <LoadingErrorOrRender<UpdateAboutPageMutation>
      error={requiresLogin}
      isLoading={loading}
      queryResult={data}
      render={({ queryResult }) => {
        return (
          <FinalForm
            onSubmit={values => handleSubmit(values)}
            initialValues={initialValues}
            render={({ form, handleSubmit }) => (
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
                <Button onClick={() => form.submit()}>
                  Save Changes
                </Button>
              </Form>
            )}
          />
        );
      }}
      errorRender={(error) => <LoginModal onSuccessfulLogin={() => setRequiresLogin(false)} />}
    />
  </Modal>);
}