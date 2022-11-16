import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import background from './../../assets/img/background2.jpg';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundImage: `url(${background})`,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Board = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>('New Board');
  const [input, setInput] = useState<string>('');

  const handleClose = () => {
    setOpen((open) => !open);
    setInput('');
  };
  const handleRename = () => {
    setName(input);
    setOpen(false);
  };
  return (
    <Item
      sx={{
        height: '150px',
        width: '300px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button sx={{ width: '80px', height: '30px', fontSize: '10px' }} variant="contained">
          Delete
        </Button>
        <Button sx={{ width: '150px', height: '30px', fontSize: '10px' }} variant="contained" onClick={handleClose}>
          Edit board name
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Rename board</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter new name</DialogContentText>
            <TextField
              autoFocus
              id="name"
              type="text"
              fullWidth
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: 'black' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button sx={{ color: 'black' }} onClick={handleRename}>
              Rename
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Item>
  );
};

export default Board;
