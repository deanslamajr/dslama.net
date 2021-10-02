import {
  Box,
  Layer
} from 'grommet';

type ModalProps = {
  onClose: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose
}) => {
  return (
    <Layer
      onEsc={onClose}
      onClickOutside={onClose}
    >
      <Box
        pad="xlarge"
        width="large"
        overflow="auto"
      >
        {children}
      </Box>
    </Layer>
  );
};