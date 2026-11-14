import React from 'react';
import { ApolloError, DocumentNode, useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Card,
  FormField,
  Text,
  TextArea as GrommetTextArea,
  TextInput as GrommetTextInput,
} from 'grommet';
import { Add, FormClose } from 'grommet-icons';
import { FieldValidator } from 'final-form';
import { Form as FinalForm, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import createDecorator from 'final-form-focus';

import {
  ResolvedInputFromConsole,
  useState as useEditModeState,
} from '../../contexts/EditModeState';
import {
  transformDateInputValueToGqlDate,
  transformGqlDateForDateInput,
} from '../../utils';
import { Modal } from '../Modal';
import { LoginModal } from '../LoginModal';
import { DateInput, TextArea, TextInput, visibleError } from './fields';

type Validator = FieldValidator<string | undefined>;

export type FieldConfig = {
  name: string;
  kind: 'text' | 'textarea' | 'date';
  label?: string;
  placeholder?: string;
  validate?: Validator;
};

export type ListConfig = {
  name: string;
  // Singular, for example "Post" in "Add Post" and "Delete Post".
  itemLabel: string;
  fields: FieldConfig[];
  // Items from window.__inputFromConsole that the editor pre-fills.
  consoleKey?: keyof NonNullable<ResolvedInputFromConsole>;
};

export type PageConfig = {
  mutation: DocumentNode;
  fieldsBeforeList: FieldConfig[];
  list: ListConfig;
  fieldsAfterList: FieldConfig[];
};

type FormItem = Record<string, string>;
type FormValues = Record<string, unknown> & {
  existingItems: FormItem[];
  newItems: FormItem[];
};
type PageData = Record<string, unknown>;

const focusOnErrors = createDecorator();

const today = () => new Date(Date.now()).toISOString();

const emptyItem = (fields: FieldConfig[]): FormItem =>
  Object.fromEntries(
    fields.map(field => [field.name, field.kind === 'date' ? today() : ''])
  );

const itemToForm = (fields: FieldConfig[], item: PageData): FormItem =>
  Object.fromEntries(
    fields.map(({ name, kind }) => [
      name,
      kind === 'date'
        ? transformGqlDateForDateInput(item[name] as number)
        : (item[name] as string) || '',
    ])
  );

const itemToInput = (fields: FieldConfig[], item: FormItem) =>
  Object.fromEntries(
    fields.map(({ name, kind }) => [
      name,
      kind === 'date'
        ? transformDateInputValueToGqlDate(item[name])
        : item[name],
    ])
  );

export const toFormValues = (
  config: PageConfig,
  page: PageData,
  fromConsole: ResolvedInputFromConsole
): FormValues => {
  const pageFields = [...config.fieldsBeforeList, ...config.fieldsAfterList];
  const items = (page[config.list.name] as PageData[] | undefined) || [];
  const consoleItems =
    (config.list.consoleKey && fromConsole?.[config.list.consoleKey]) || [];

  return {
    ...Object.fromEntries(
      pageFields.map(({ name }) => [name, (page[name] as string) || ''])
    ),
    existingItems: items.map(item => itemToForm(config.list.fields, item)),
    newItems: (consoleItems as unknown) as FormItem[],
  };
};

export const toMutationInput = (
  config: PageConfig,
  values: FormValues
): Record<string, unknown> => {
  const pageFields = [...config.fieldsBeforeList, ...config.fieldsAfterList];
  return {
    ...Object.fromEntries(
      pageFields.map(({ name }) => [name, values[name] || ''])
    ),
    [config.list.name]: [
      ...values.existingItems,
      ...values.newItems,
    ].map(item => itemToInput(config.list.fields, item)),
  };
};

const PageField: React.FC<{ field: FieldConfig }> = ({ field }) => (
  <Field<string | undefined> name={field.name} validate={field.validate}>
    {({ input, meta }) => (
      <FormField
        label={field.label || field.name}
        width="full"
        error={visibleError(meta)}>
        {field.kind === 'textarea' ? (
          <GrommetTextArea
            {...input}
            onChange={input.onChange}
            value={input.value}
            rows={10}
          />
        ) : (
          <GrommetTextInput
            {...input}
            placeholder={field.placeholder}
            onChange={input.onChange}
            value={input.value}
          />
        )}
      </FormField>
    )}
  </Field>
);

const ItemCard: React.FC<{
  fields: FieldConfig[];
  parentFieldName: string;
  removeButtonLabel: string;
  onRemoveCard: () => void;
}> = ({ fields, parentFieldName, removeButtonLabel, onRemoveCard }) => (
  <Box margin={{ top: 'small', bottom: 'small' }}>
    <Card background="light-1" round="x-small" pad="medium">
      {fields.map(field => {
        const props = {
          key: field.name,
          fieldName: field.name,
          parentFieldName,
          validate: field.validate,
        };
        if (field.kind === 'date') return <DateInput {...props} />;
        if (field.kind === 'textarea') return <TextArea {...props} />;
        return <TextInput {...props} placeholder={field.placeholder || ''} />;
      })}
      <Button
        secondary
        hoverIndicator={{ color: 'status-critical', opacity: 'weak' }}
        fill="horizontal"
        onClick={onRemoveCard}>
        <Box pad="xsmall" direction="row" align="center" gap="small">
          <FormClose color="status-critical" />
          <Text>{removeButtonLabel}</Text>
        </Box>
      </Button>
    </Card>
  </Box>
);

const listContentProps = {
  border: undefined,
  fill: 'horizontal' as const,
  pad: { left: 'medium' },
};

const describeSaveError = (error: ApolloError) => {
  const first = error.graphQLErrors[0];
  const code =
    first?.extensions?.code ||
    (error.networkError ? 'NETWORK_ERROR' : 'UNKNOWN_ERROR');
  return `Save failed (${code}): ${first?.message || error.message}`;
};

type Props = {
  config: PageConfig;
  page: PageData;
};

export const VersionedPageEditModal: React.FC<Props> = ({ config, page }) => {
  const [editModeState, setEditModeState] = useEditModeState();
  const [needsLogin, setNeedsLogin] = React.useState(false);
  const [saveError, setSaveError] = React.useState<string | undefined>(
    undefined
  );
  const { list } = config;

  const closeModal = React.useCallback(() => {
    setEditModeState({ ...editModeState, showModal: false });
  }, [editModeState, setEditModeState]);

  const [save, { loading }] = useMutation(config.mutation, {
    onCompleted: () => closeModal(),
    onError: error => {
      if (
        error.graphQLErrors.some(e => e.extensions?.code === 'UNAUTHENTICATED')
      ) {
        setNeedsLogin(true);
        return;
      }
      setSaveError(describeSaveError(error));
    },
  });

  const initialValues = React.useMemo(
    () => toFormValues(config, page, editModeState.resolvedInputFromConsole),
    // The form keeps its own state after the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config, page]
  );

  const onSubmit = (values: FormValues) => {
    setSaveError(undefined);
    save({ variables: { input: toMutationInput(config, values) } });
  };

  return (
    <FinalForm
      onSubmit={values => onSubmit(values as FormValues)}
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
      subscription={{ pristine: true }}
      decorators={[focusOnErrors]}
      render={({
        form,
        form: {
          mutators: { push },
        },
        handleSubmit,
        pristine,
      }) =>
        needsLogin ? (
          <LoginModal
            message="Unauthenticated! Please login and try again."
            onSuccessfulLogin={() => setNeedsLogin(false)}
            onCloseClick={() => setNeedsLogin(false)}
          />
        ) : (
          <Modal
            errorMessage={saveError}
            disableSave={pristine}
            isLoading={loading}
            onSaveClick={() => form.submit()}
            onClose={() => closeModal()}>
            <form onSubmit={handleSubmit}>
              <Box align="start" alignContent="center" pad="large" width="full">
                {config.fieldsBeforeList.map(field => (
                  <PageField key={field.name} field={field} />
                ))}
                <Button
                  secondary
                  hoverIndicator={{ color: 'status-ok', opacity: 'weak' }}
                  fill="horizontal"
                  onClick={() => push('newItems', emptyItem(list.fields))}>
                  <Box pad="xsmall" direction="row" align="center" gap="small">
                    <Add color="status-ok" />
                    <Text>Add {list.itemLabel}</Text>
                  </Box>
                </Button>
                <FormField contentProps={listContentProps} width="100%">
                  <FieldArray name="newItems" subscription={{}}>
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <ItemCard
                          key={name}
                          fields={list.fields}
                          parentFieldName={name}
                          removeButtonLabel="Cancel"
                          onRemoveCard={() => fields.remove(index)}
                        />
                      ))
                    }
                  </FieldArray>
                </FormField>
                <FormField
                  label={`edit existing ${list.name}`}
                  contentProps={listContentProps}
                  width="100%">
                  <FieldArray name="existingItems" subscription={{}}>
                    {({ fields }) =>
                      fields.map((name, index) => (
                        <ItemCard
                          key={name}
                          fields={list.fields}
                          parentFieldName={name}
                          removeButtonLabel={`Delete ${list.itemLabel}`}
                          onRemoveCard={() => fields.remove(index)}
                        />
                      ))
                    }
                  </FieldArray>
                </FormField>
                {config.fieldsAfterList.map(field => (
                  <PageField key={field.name} field={field} />
                ))}
              </Box>
            </form>
          </Modal>
        )
      }
    />
  );
};
