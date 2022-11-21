import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useState } from 'react';

const DeleteModal = (props: { message: string; submit: () => void }) => {
  const [openDeleteMessage, setOpenDeleteMessage] = useState<boolean>(false);
  const handleCloseDelete = () => {
    setOpenDeleteMessage((openDeleteMessage) => !openDeleteMessage);
  };
  return (
    <>
      <Button onClick={handleCloseDelete} fullWidth variant="contained" color="secondary" sx={{ marginBottom: '10px' }}>
        Delete
      </Button>
      <Dialog open={openDeleteMessage} onClose={handleCloseDelete}>
        <DialogTitle>{props.message}</DialogTitle>
        <DialogActions>
          <Button sx={{ color: 'black' }} onClick={handleCloseDelete}>
            No
          </Button>
          <Button
            sx={{ color: 'black' }}
            onClick={() => {
              props.submit();
              handleCloseDelete();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteModal;
