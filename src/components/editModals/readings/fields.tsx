import React from 'react';
import { Field } from 'react-final-form';
import {
  Box,
  DateInput,
  Button,
  FormField,
  Text,
  TextArea,
  TextInput
} from "grommet";

import {isRequired, isValidUrl} from '../../../utils';

type BaseProps = {
  parentFieldName: string;
};

export const TitleInput: React.FC<BaseProps> = ({
  parentFieldName
}) => {

  return (
    <Field
    name={`${parentFieldName}.title`}
    component="input"
    validate={isRequired}
  >
    {({ input, meta }) => {
      return (
        <FormField
          label="title"
          error={meta.touched ? meta.error : undefined}
          margin={{bottom: 'xsmall'}}
        >
          <TextInput
            {...input}
            onChange={input.onChange}
            value={input.value}
            placeholder="This is a Contrived Reading Title"
          />
        </FormField>
      );
    }}
  </Field>
  )
};

export const AuthorInput: React.FC<BaseProps> = ({
  parentFieldName
}) => {

  return (
    <Field
      name={`${parentFieldName}.author`}
      component="input"
      validate={isRequired}
    >
      {({ input, meta }) => {
        return (
          <FormField
            label="author"
            error={meta.touched ? meta.error : undefined}
            margin={{bottom: 'xsmall'}}
          >
            <TextInput
              {...input}
              onChange={input.onChange}
              value={input.value}
              placeholder="Captain Author Smith"
            />
          </FormField>
        );
      }}
    </Field>
  );
};

export const UrlInput: React.FC<BaseProps> = ({
  parentFieldName
}) => {

  return (
    <Field
      name={`${parentFieldName}.url`}
      component="input"
      validate={isValidUrl}
    >
      {({ input, meta }) => {
        return (
          <FormField
            label="source url"
            error={meta.touched ? meta.error : undefined}
            margin={{bottom: 'xsmall'}}
          >
            <TextInput
              {...input}
              onChange={input.onChange}
              value={input.value}
              placeholder="https://www.blogsRus.com"
            />
          </FormField>
        );
      }}
    </Field>
  )
};

export const QuoteInput: React.FC<BaseProps> = ({
  parentFieldName
}) => {
  return (
    <Field
      name={`${parentFieldName}.quote`}
      component="input"
      validate={isRequired}
    >
      {({ input, meta }) => (
        <FormField
          label="quote"
          error={meta.touched ? meta.error : undefined}
          width="full"
        >
          <TextArea
            {...input}
            onChange={input.onChange}
            value={input.value}
            rows={10}
          />
        </FormField>
      )}
    </Field>
  )
};

export const PublicationInput: React.FC<BaseProps> = ({
  parentFieldName
}) => {
  return (
    <Field
      name={`${parentFieldName}.publication`}
      component="input"
      validate={isRequired}
    >
      {({ input, meta }) => (
        <FormField
          label="publication"
          error={meta.touched ? meta.error : undefined}
          width="full"
        >
          <TextInput
            {...input}
            onChange={input.onChange}
            value={input.value}
            placeholder="Blogs R Us"
          />
        </FormField>
      )}
    </Field>
  )
};

export const PublishDateInput: React.FC<BaseProps> = ({
  parentFieldName
}) => {
  return (
    <Field name={`${parentFieldName}.publishDate`}>
      {({ input }) => (
        <FormField
          label="When was this reading published?"
          width="full"
        >
          <DateInput
            format="mm/dd/yyyy"
            value={input.value}
            onChange={({ value }) => input.onChange(value)}
          />
        </FormField>
      )}
    </Field>
  );
};

export const FoundDateInput: React.FC<BaseProps> = ({
  parentFieldName
}) => {
  return (
    <Field name={`${parentFieldName}.foundDate`}>
      {({ input }) => (
        <FormField
          label="When did you originally read this? (used for ordering the items)"
          width="full"
        >
          <DateInput
            format="mm/dd/yyyy"
            value={input.value}
            onChange={({ value }) => input.onChange(value)}
          />
        </FormField>
      )}
    </Field>
  );
};