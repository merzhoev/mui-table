import { Box, Button, Stack, Typography } from '@mui/material';
import { getFormattedCurrency } from 'helpers/get-formatted-currency';
import { Row } from 'types/entities';
import { Modal, ModalProps } from 'components/modal';

interface ModalInfoProps extends ModalProps {
  book: Row;
}

export function ModalInfo({ open, onClose, book }: ModalInfoProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          width: 400,
        }}>
        <Typography variant="h5" component="h2">
          {book.title}
        </Typography>
        <Typography color="GrayText">{book.description}</Typography>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          <Typography>30.05.2023</Typography>
          <Typography>{getFormattedCurrency(book.price)}</Typography>
        </Stack>
        <Button onClick={onClose} variant="contained">
          Закрыть
        </Button>
      </Box>
    </Modal>
  );
}
