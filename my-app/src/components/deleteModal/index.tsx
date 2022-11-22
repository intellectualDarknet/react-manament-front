import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DeleteModal = (props: { message: string; submit: () => void }) => {
  const { t } = useTranslation();
  const [openDeleteMessage, setOpenDeleteMessage] = useState<boolean>(false);
  const handleCloseDelete = () => {
    setOpenDeleteMessage((openDeleteMessage) => !openDeleteMessage);
  };
  return (
    <>
      <Button onClick={handleCloseDelete} fullWidth variant="contained" color="secondary" sx={{ marginBottom: '10px' }}>
        {t('deletModal.delete')}
      </Button>
      <Dialog open={openDeleteMessage} onClose={handleCloseDelete}>
        <DialogTitle>{props.message}</DialogTitle>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleCloseDelete}>
            {t('deletModal.no')}
          </Button>
          <Button
            sx={{ color: 'black' }}
            onClick={() => {
              props.submit();
              handleCloseDelete();
            }}
          >
            {t('deletModal.yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
