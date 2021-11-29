import React from 'react';
import {ApolloError} from '@apollo/client';
import {
  Box,
  Button,
  FormField,
  Text,
  TextArea,
  TextInput
} from "grommet";
import {Add, FormTrash} from 'grommet-icons'
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'

import {useUpdateAboutPageMutation, FetchAboutQuery} from '../../../graphql/generated/ops';

import {useState as useEditModeState} from '../../../contexts/EditModeState';
import {isValidUrl} from '../../../utils';
import {Modal} from '../../Modal';
import {LoginModal} from '../../LoginModal';
import {LinkCard} from './LinkCard';

type AboutPageEditModalProps = {
  initialValues: FetchAboutQuery;
}

export const AboutPageEditModal: React.FC<AboutPageEditModalProps> = ({
  initialValues
}) => {
  const [editModeState, setEditModeState] = useEditModeState();
  const [authenticationError, setError] = React.useState<ApolloError | undefined>(undefined);

  const closeModal = React.useCallback(() => {
    setEditModeState({
      ...editModeState,
      showModal: false
    });
  }, [editModeState, setEditModeState]);

  const [updateAboutPage, {loading}] = useUpdateAboutPageMutation({
    onCompleted: () => {
      closeModal();
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
    updateAboutPage({
      variables: {
        input: {
          ...values
        }
      }
    });
  };

  const transformedInitialValues = React.useMemo(() => {
    const {
      aboutPage: {
        bio,
        links,
        pictureURL,
        title
      }
    } = initialValues;
    
    const transformedLinks = links?.map(({name, url}) => (
      {name, url}
    ));

    return {
      links: transformedLinks || [],
      pictureURL: pictureURL || '',
      bio: bio || '',
      title: title || ''
    };
  }, [initialValues]);
  
  return (
    <FinalForm
      onSubmit={values => handleSubmit(values)}
      initialValues={transformedInitialValues}
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
        authenticationError
          ? (
            <LoginModal
              message="Unauthenticated! Please login and try again."
              onSuccessfulLogin={() => setError(undefined)}
              onCloseClick={() => setError(undefined)}
            />
          )
          : (
            <Modal
              isLoading={loading}
              onSaveClick={() => form.submit()}
              onClose={() => closeModal()}
            >
              <form onSubmit={handleSubmit}>
                <Box
                  align="start"
                  alignContent="center"
                  pad="large"
                  width="full"
                >
                  <Field<string> name="title">
                    {({ input, meta }) => {
                      return (
                        <FormField
                          label="title"
                          width="full"
                        >
                          <TextInput
                            {...input}
                            placeholder="set a title string"
                            onChange={input.onChange}
                            value={input.value}
                          />
                        </FormField>
                      );
                    }}
                  </Field>
                  <FormField
                    label="links"
                    contentProps={{
                      border: undefined,
                      fill: 'horizontal',
                      pad: {left: 'medium'}
                    }}
                    width="100%"
                  >
                    <Button
                      secondary
                      hoverIndicator={true}
                      fill="horizontal"
                      onClick={() => push('links', undefined)}
                    >
                      <Box pad="xsmall" direction="row" align="center" gap="small">
                        <Add color="brand"/>
                        <Text>Add Link</Text>
                      </Box>
                    </Button>
                    <FieldArray
                      name="links"
                      subscription={{}}  
                    >
                      {({ fields }) => (
                        fields.map((name, index) => (
                          <LinkCard
                            onRemoveCard={() => fields.remove(index)}
                            parentFieldName={name}
                            removeButtonLabel='Delete Link'
                          />
                        ))
                      )}
                    </FieldArray>
                  </FormField>
                  <Field<string> name="pictureURL">
                    {({ input, meta }) => {
                      return (
                      <FormField
                        label="banner pic url"
                        width="full"
                      >
                        <TextInput
                          {...input}
                          onChange={input.onChange}
                          value={input.value}
                        />
                      </FormField>
                      );
                    }}
                  </Field>
                  <Field<string> name="bio">
                    {({ input, meta }) => {
                      return (
                      <FormField
                        label="bio"
                        width="full"
                      >
                        <TextArea
                          {...input}
                          onChange={input.onChange}
                          value={input.value}
                          rows={10}
                        />
                      </FormField>
                      );
                    }}
                  </Field>
                </Box>
              </form>
            </Modal>
          )
      )}
    /> 
  );
}