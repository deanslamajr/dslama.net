import React from 'react';
import {ApolloError} from '@apollo/client';
import {
  Box,
  Button,
  FormField,
  Text,
  TextInput
} from "grommet";
import {
  Add,
  FormClose,
  FormTrash
} from 'grommet-icons'
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import createDecorator from 'final-form-focus'

import {
  UpdateReadingsPageMutationVariables,
  ReadingInput,
  useUpdateReadingsPageMutation,
  FetchReadingsQuery
} from '../../../graphql/generated/ops';

import {
  transformGqlDateForDateInput,
  transformDateInputValueToGqlDate
} from '../../../utils';

import {useState as useEditModeState} from '../../../contexts/EditModeState';
import {Modal} from '../../Modal';
import {LoginModal} from '../../LoginModal';
import {
  AuthorInput,
  FoundDateInput,
  PublicationInput,
  PublishDateInput,
  QuoteInput,
  TitleInput,
  UrlInput
} from './fields';

import { FormApi } from 'final-form';

const focusOnErrors = createDecorator();

type MutableReading = Omit<
  NonNullable<FetchReadingsQuery['readingsPage']['readings']>[number],
  'id' | '__typename' | 'publishDate' | 'foundDate'
> & {
  publishDate: string;
  foundDate: string;
};

const EMPTY_READING: MutableReading = {
  publishDate: '',
  foundDate: '',
  title: '',
  quote: '',
  author: '',
  publication: '',
  url: ''
};

const initializeNewReading = (): MutableReading => {
  const todaysDate = (new Date(Date.now())).toISOString();

  return {
    ...EMPTY_READING,
    publishDate: todaysDate,
    foundDate: todaysDate
  };
};

type ReadingsPageEditModalProps = {
  initialValues: FetchReadingsQuery['readingsPage'];
};

export const ReadingsPageEditModal: React.FC<ReadingsPageEditModalProps> = ({
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

  const [updateReadingsPage, {loading}] = useUpdateReadingsPageMutation({
    onCompleted: () => {
      closeModal()
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

  const handleSubmit = async (values: Record<string, any>, form: FormApi) => {
    type Values = {
      newReadings: MutableReading[];
      readings: MutableReading[];
      summary: string;
    };

    const transformFormValuesForMutationPayload = ({
      newReadings,
      readings,
      summary
    }: Values): UpdateReadingsPageMutationVariables => {
      const transformedReadings: ReadingInput[] = [
        ...readings,
        ...newReadings
      ].map((reading) => ({
        ...reading,
        publishDate: transformDateInputValueToGqlDate(reading.publishDate),
        foundDate: transformDateInputValueToGqlDate(reading.foundDate) 
      }));

      return {
        input: {
          readings: transformedReadings,
          summary
        }
      }
    };

    const mutationInput = transformFormValuesForMutationPayload(values as Values);

    updateReadingsPage({
      variables: mutationInput
    });
  };

  type InitialValues = {
    summary: string;
    newReadings: MutableReading[];
    readings: MutableReading[];
  };
  const augmentedInitialValues = React.useMemo<InitialValues>(() => {
    const summary = initialValues.summary || '';

    // const newReadings = editModeState.readingsFromConsole || [];

    const existingReadings: MutableReading[] = initialValues.readings?.map((reading) => {
      return {
        author: reading.author,
        url: reading.url,
        title: reading.title,
        foundDate: transformGqlDateForDateInput(reading.foundDate),
        publishDate: transformGqlDateForDateInput(reading.publishDate),
        publication: reading.publication,
        quote: reading.quote
      }
    }) || [] as MutableReading[];

    return {
      summary,
      newReadings: [] as MutableReading[],
      readings: existingReadings
    };
  }, [initialValues]);
  
  return (
    <FinalForm
      onSubmit={(values, form) => handleSubmit(values, form)}
      initialValues={augmentedInitialValues}
      mutators={{
        ...arrayMutators
      }}
      subscription={{ pristine: true }}
      decorators={[ focusOnErrors ]} 
      render={({
        form,
        form: {
          mutators: { push }
        }, 
        handleSubmit,
        pristine
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
              disableSave={pristine}
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
                  <Field<string> name="summary">
                    {({ input }) => {
                      return (
                        <FormField
                          label="page summary"
                          width="full"
                        >
                          <TextInput
                            {...input}
                            placeholder="What is this page about?"
                            onChange={input.onChange}
                            value={input.value}
                          />
                        </FormField>
                      );
                    }}
                  </Field>
                  <Button
                    secondary
                    hoverIndicator={true}
                    fill="horizontal"
                    onClick={() => push('newReadings', initializeNewReading())}
                  >
                    <Box pad="xsmall" direction="row" align="center" gap="small">
                      <Add color="brand"/>
                      <Text>Add Reading</Text>
                    </Box>
                  </Button>
                  <FormField
                    contentProps={{
                      border: undefined,
                      fill: 'horizontal',
                      pad: {left: 'medium'}
                    }}
                    width="100%"
                  >
                    <FieldArray
                      name="newReadings"
                      subscription={{}}
                    >
                      {({ fields }) => (
                        fields.map((name, index) => (
                          <Box
                            key={name}
                            margin={{
                              top: 'small',
                              bottom: 'small'
                            }}  
                          >
                            <TitleInput parentFieldName={name} />
                            <AuthorInput parentFieldName={name} />
                            <UrlInput parentFieldName={name} />
                            <QuoteInput parentFieldName={name} />
                            <PublicationInput parentFieldName={name} />
                            <PublishDateInput parentFieldName={name} />
                            <FoundDateInput parentFieldName={name} />
                            <Button
                              secondary
                              hoverIndicator={true}
                              fill="horizontal"
                              onClick={() => fields.remove(index)}
                            >
                              <Box pad="xsmall" direction="row" align="center" gap="small">
                                <FormClose color="brand"/>
                                <Text>Cancel</Text>
                              </Box>
                            </Button>
                          </Box>
                        ))
                      )}
                    </FieldArray>
                  </FormField>  
                  <FormField
                    label="edit existing readings"
                    contentProps={{
                      border: undefined,
                      fill: 'horizontal',
                      pad: {left: 'medium'}
                    }}
                    width="100%"
                  >
                    <FieldArray
                      name="readings"
                      subscription={{}}  
                    >
                      {({ fields }) => (
                        fields?.map((name, index) => (
                          <Box
                            key={name}
                            margin={{
                              top: 'small',
                              bottom: 'small'
                            }}  
                          >
                            <TitleInput parentFieldName={name} />
                            <AuthorInput parentFieldName={name} />
                            <UrlInput parentFieldName={name} />
                            <QuoteInput parentFieldName={name} />
                            <PublicationInput parentFieldName={name} />
                            <PublishDateInput parentFieldName={name} />
                            <FoundDateInput parentFieldName={name} />
                            <Button
                              secondary
                              hoverIndicator={true}
                              fill="horizontal"
                              onClick={() => fields.remove(index)}
                            >
                              <Box pad="xsmall" direction="row" align="center" gap="small">
                                <FormTrash color="brand"/>
                                <Text>Delete Reading</Text>
                              </Box>
                            </Button>
                          </Box>
                        ))
                      )}
                    </FieldArray>
                  </FormField>
                </Box>
              </form>
            </Modal>
          )
      )}
    />
  );
}