import React from 'react';
import { Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

function DeleteColumnButton(handleToggleModal: () => void): JSX.Element {
  return (
    <Button
      className="column__delete-btn"
      onClick={handleToggleModal}
      variant="outlined"
      color="error"
      sx={{ marginBottom: '10px' }}
      endIcon={<DeleteIcon />}
    >
      Delete column
    </Button>
  );
}

export default DeleteColumnButton;
