import { Box, Button, Typography, Modal } from '@mui/material';
import style from '../pages/MainStyle';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Подтверждение удаления
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Вы уверены, что хотите удалить эту запись?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose} variant="contained">
            Отмена
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Удалить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
