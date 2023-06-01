import { Box, Modal as ModalMui } from '@mui/material';
import { PropsWithChildren } from 'react';
import { ModalProps } from './modal.types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: '4px',
  boxShadow: 24,
  p: 4,
};

export function Modal({ open, onClose, children }: PropsWithChildren<ModalProps>) {
  return (
    <ModalMui open={open} onClose={onClose}>
      <Box sx={style}>{children}</Box>
    </ModalMui>
  );
}
