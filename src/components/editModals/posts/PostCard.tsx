import React from 'react';
import {
  Box,
  Button,
  Card,
  Text
} from "grommet";
import {FormClose} from 'grommet-icons'

import {
  DateInput,
  TextArea,
  TextInput
} from '../fields';
import {
  isRequired,
  isValidUrl
} from '../../../utils';

type PostCardProps = {
  onRemoveCard: () => void;
  parentFieldName: string;
  removeButtonLabel: string;
}

export const PostCard: React.FC<PostCardProps> = ({
  onRemoveCard,
  parentFieldName,
  removeButtonLabel
}) => {

  return (
    <Box
      key={parentFieldName}
      margin={{
        top: 'small',
        bottom: 'small'
      }}  
    >
      <Card background="light-1" round="x-small" pad="medium">
        <TextInput
          fieldName='title'
          placeholder='This is a Contrived Reading Title'
          parentFieldName={parentFieldName}
          validate={isRequired}
        />
        <TextInput
          fieldName='url'
          placeholder='https://www.deansblog.com'
          parentFieldName={parentFieldName}
          validate={isValidUrl}
        />
        <TextArea
          fieldName='snippet'
          parentFieldName={parentFieldName}
          validate={isRequired}
        />
        <DateInput
          fieldName='originalPublishDate'
          parentFieldName={parentFieldName}
          validate={isRequired}
        />
        <Button
          secondary
          hoverIndicator={{color: "status-critical", opacity: 'weak'}}
          fill="horizontal"
          onClick={onRemoveCard}
        >
          <Box pad="xsmall" direction="row" align="center" gap="small">
            <FormClose color="status-critical"/>
            <Text>{removeButtonLabel}</Text>
          </Box>
        </Button>
      </Card>
    </Box>
  )
};