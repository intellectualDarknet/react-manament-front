import React from 'react';
import { Button } from '@mui/material';

function DeleteButton(handleToggleModal: () => void): JSX.Element {
  return (
    <Button onClick={handleToggleModal} fullWidth variant="contained" color="secondary" sx={{ marginBottom: '10px' }}>
      Delete
    </Button>
  );
}

export default DeleteButton;
