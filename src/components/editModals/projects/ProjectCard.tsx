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

type ProjectCardProps = {
  onRemoveCard: () => void;
  parentFieldName: string;
  removeButtonLabel: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
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
          fieldName='name'
          placeholder='This is a Contrived Project Name'
          parentFieldName={parentFieldName}
          validate={isRequired}
        />
        <TextInput
          fieldName='appUrl'
          placeholder='https://someApp.dslama.net'
          parentFieldName={parentFieldName}
          validate={isValidUrl}
        />
        <TextInput
          fieldName='sourceUrl'
          placeholder='https://www.github.com/deanslama/someAppName'
          parentFieldName={parentFieldName}
          validate={isValidUrl}
        />
        <TextArea
          fieldName='description'
          parentFieldName={parentFieldName}
          validate={isRequired}
        />
        <TextArea
          fieldName='summary'
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