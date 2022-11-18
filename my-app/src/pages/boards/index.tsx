import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Board from './components/Board/board';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { IBoardsState } from './../../store/boards/boards-slice';
import { createBoard, getBoards } from 'store/boards/boards-thunks';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundColor: theme.palette.secondary.main,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.primary.main,
}));

const Boards = () => {
  const [open, setOpen] = useState<boolean>(false);
  const boardsResp: IBoardsState = useAppSelector((state: RootState) => state.rootReducer.boardsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  const handleClose = () => {
    setOpen((open) => !open);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        overflowY: 'scroll',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
        margin: '30px 0 0 30px',
      }}
    >
      <Grid container sx={{ flexGrow: 1, justifyContent: 'start' }} spacing={2} columns={{ xs: 4, sm: 3 }}>
        {boardsResp.boards
          ? boardsResp.boards.map((board, index) => <Board key={index} title={board.title} id={board._id} />)
          : []}
        <div>
          <Item
            sx={{
              width: '300px',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            onClick={handleClose}
          >
            <Typography variant="h4" gutterBottom>
              + Add new board
            </Typography>
          </Item>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add new board</DialogTitle>
            <DialogContent>
              <DialogContentText>Please enter name of the board.</DialogContentText>
              <TextField autoFocus id="name" type="text" fullWidth />
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: 'black' }} onClick={handleClose}>
                Cancel
              </Button>
              <Button sx={{ color: 'black' }} onClick={handleClose}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Grid>
    </Box>
  );
};

export default Boards;
