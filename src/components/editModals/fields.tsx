import { Field as FinalFormField } from 'react-final-form';
import {FieldValidator} from 'final-form';
import {
  Box,
  DateInput as GrommetDateInput,
  Button,
  FormField as GrommetFormField,
  Text,
  TextArea as GrommetTextArea,
  TextInput as GrommetTextInput
} from "grommet";

type TextInputProps = {
  fieldName: string;
  parentFieldName: string;
  placeholder: string;
  validate?: FieldValidator<string | undefined>;
};

export const TextInput: React.FC<TextInputProps> = ({
  fieldName,
  parentFieldName,
  placeholder,
  validate
}) => {

  return (
    <FinalFormField
      name={`${parentFieldName}.${fieldName}`}
      component="input"
      validate={validate}
    >
    {({ input, meta }) => {
      return (
        <GrommetFormField
          label={fieldName}
          error={meta.touched ? meta.error : undefined}
          margin={{bottom: 'xsmall'}}
        >
          <GrommetTextInput
            {...input}
            onChange={input.onChange}
            value={input.value}
            placeholder={placeholder}
          />
        </GrommetFormField>
      );
    }}
  </FinalFormField>
  )
};

type TextAreaProps = {
  fieldName: string;
  parentFieldName: string;
  validate?: FieldValidator<string | undefined>;
};

export const TextArea: React.FC<TextAreaProps> = ({
  fieldName,
  parentFieldName,
  validate
}) => {

  return (
    <FinalFormField
      name={`${parentFieldName}.${fieldName}`}
      component="input"
      validate={validate}
    >
    {({ input, meta }) => {
      return (
        <GrommetFormField
          label={fieldName}
          error={meta.touched ? meta.error : undefined}
          width="full"
        >
          <GrommetTextArea
            {...input}
            onChange={input.onChange}
            value={input.value}
            rows={10}
          />
        </GrommetFormField>
      );
    }}
  </FinalFormField>
  )
};

type DateInputProps = {
  fieldName: string;
  parentFieldName: string;
  validate?: FieldValidator<string | undefined>;
};

export const DateInput: React.FC<DateInputProps> = ({
  fieldName,
  parentFieldName,
  validate
}) => {
  return (
    <FinalFormField
      name={`${parentFieldName}.${fieldName}`}
      validate={validate}
    >
      {({ input }) => (
        <GrommetFormField
          label={fieldName}
          width="full"
        >
          <GrommetDateInput
            format="mm/dd/yyyy"
            value={input.value}
            onChange={({ value }) => input.onChange(value)}
          />
        </GrommetFormField>
      )}
    </FinalFormField>
  );
};