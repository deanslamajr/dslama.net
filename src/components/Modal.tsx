import {
  Box,
  Button,
  Header,
  Layer,
  Nav,
  Spinner,
  Text
} from 'grommet';
import { Close, Save } from 'grommet-icons';

type ModalProps = {
  disableSave?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSaveClick: () => void;
  primaryButtonLabel?: string;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  disableSave,
  isLoading,
  onClose,
  onSaveClick,
  primaryButtonLabel = 'Save'
}) => {
  return (
    <Layer
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Header
        background="accent-1"
        elevation="medium"
        pad="small"
      >
        <Nav direction="row" width="100%" justify="between">
          <Button
            disabled={disableSave}
            hoverIndicator="light-1"
            onClick={() => onSaveClick()}
          >
            {/*  When Button include children, it is treated as plain */}
            <Box pad="small" direction="row" align="center" gap="small">
              <Save />
              <Text>{primaryButtonLabel}</Text>
            </Box>
          </Button>
          <Button hoverIndicator="light-1" onClick={() => onClose()}>
            {/*  When Button include children, it is treated as plain */}
            <Box pad="small" direction="row" align="center" gap="small">
              <Close />
              <Text>Cancel</Text>
            </Box>
          </Button>
        </Nav>
      </Header>
      <Box
        pad="medium"
        width="large"
        overflow="auto"
      >
        {
          isLoading
            ? (
              <Box
                direction="row"
                align="center"
                pad="medium"
                justify="center"
                width="100%"
              >
                <Spinner size="medium"/>
              </Box>
            )
            : children
        }
      </Box>
    </Layer>
  );
};