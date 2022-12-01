import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, styled, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import background from 'assets/img/background2.jpg';
import { useAppDispatch, useAppSelector, RootState } from 'store/store';
import { useNavigate } from 'react-router-dom';
import { updateBoardById, deleteBoardById, getBoardById, getBoardsByUserId } from 'store/boards/boards-thunks';
import DeleteModal from 'components/deleteModal';
import DeleteButton from '../DeleteButton';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@mui/material/CircularProgress';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  backgroundImage: `url(${background})`,
  padding: theme.spacing(1),
  margin: theme.spacing(1.2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Board = (props: { title: string; id: string }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>(' ');
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen((open) => !open);
    setInput('');
  };
  const handleRename = () => {
    dispatch(updateBoardById({ boardId: props.id, title: input, owner: userId, users: ['string'] }));
    setOpen(false);
    dispatch(getBoardsByUserId(userId));
  };
  const deleteCard = () => {
    dispatch(deleteBoardById(props.id));
    dispatch(getBoardsByUserId(userId));
  };

  const boardIsUpdating = useAppSelector((state: RootState) => state.rootReducer.boardsReducer.updateBoardLoading);

  return (
    <Item
      sx={{
        height: '150px',
        width: { sm: '300px', xs: '270px' },
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
      onClick={async () => {
        await dispatch(getBoardById(props.id));
        navigate('/board', { replace: true });
      }}
    >
      <Typography variant="h4" gutterBottom>
        {boardIsUpdating ? <CircularProgress color="primary" /> : props.title}
      </Typography>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          sx={{ margin: '10px', padding: '10px', borderRadius: '32px', width: 'auto' }}
          variant="contained"
          fullWidth
          onClick={handleClose}
        >
          {t('boards.edit')}
        </Button>
        <DeleteModal message={t('deleteModal.message')} submit={deleteCard} deleteButton={DeleteButton} />
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{t('boards.rename')}</DialogTitle>
          <DialogContent>
            <DialogContentText>{t('boards.enterName')}</DialogContentText>
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
              {t('boards.cancel')}
            </Button>
            <Button sx={{ color: 'black' }} onClick={handleRename}>
              {t('boards.rename')}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Item>
  );
};

export default Board;
