import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import background from './../../../../assets/img/background2.jpg';
import { useState } from 'react';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { Link, useNavigate } from 'react-router-dom';
import { updateBoardById, deleteBoardById, getBoardById } from 'store/boards/boards-thunks';
import { IBoardsState } from 'store/boards/boards-slice';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundImage: `url(${background})`,
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Board = (props: { title: string; id: string }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const boardById: IGetBoardResponse = useAppSelector((state: RootState) => state.rootReducer.boardsReducer.boardById);
  const boardsResp: IBoardsState = useAppSelector((state: RootState) => state.rootReducer.boardsReducer);
  const dispatch = useAppDispatch();

  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setOpen((open) => !open);
    setInput('');
  };
  const handleRename = () => {
    /*     console.log(boardById);
    dispatch(updateBoardById({ boardId: boardById._id, title: input, ...boardById })); */
    setOpen(false);
  };
  const deleteCard = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(deleteBoardById(boardById._id));
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
      onClick={() => {
        dispatch(getBoardById(props.id));
        navigate('/board', { replace: true });
      }}
    >
      <Typography variant="h4" gutterBottom>
        {props.title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button sx={{ width: '80px', height: '30px', fontSize: '10px' }} variant="contained" onClick={deleteCard}>
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
