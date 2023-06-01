import { Avatar, Stack } from '@mui/material';
import { Modal, ModalProps } from 'components/modal';

interface ModalImageProps extends ModalProps {
  image: string;
}

export function ModalImage({ open, onClose, image }: ModalImageProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Stack width={400} direction="row" justifyContent="center">
        <Avatar alt="book image" src={image} sx={{ width: 128, height: 128 }} variant="rounded" />
      </Stack>
    </Modal>
  );
}
