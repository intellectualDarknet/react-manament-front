import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useAppDispatch, useAppSelector } from 'store/store';
import { createColumn } from 'store/columns/columns-thunks';

interface IColumnTitle {
  title: string;
}

const CreateColumnForm = (props: {
  board: IGetBoardResponse;
  currentBoardColumnsCount: number;
  toggleForm: () => void;
}): JSX.Element => {
  // const auth: IAuthState = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  // TODO: Заменить на переменную загрузки колонки
  const dispatch = useAppDispatch();
  const [newColumnTitle, setNewColumnTitle] = useState<IColumnTitle>({ title: '' });
  const onColumnTitleSubmit = async () => {
    await dispatch(
      createColumn({
        boardId: props.board._id,
        title: newColumnTitle.title,
        order: props.currentBoardColumnsCount,
      })
    );
    console.log(props.currentBoardColumnsCount);
    setNewColumnTitle(() => {
      return { title: '' };
    });
    props.toggleForm();
  };

  function onFormChange(e: FormEvent<HTMLFormElement>) {
    const value = (e.target as HTMLInputElement).value;
    setNewColumnTitle(() => {
      return { title: value };
    });
  }

  return (
    <Grid
      item
      className="board__create_column_form"
      sx={{
        width: '100%',
        height: '60%',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0 20px 20px 0',
      }}
    >
      <ValidatorForm
        onError={(errors) => console.log(errors)}
        onSubmit={onColumnTitleSubmit}
        onChange={onFormChange}
        noValidate
        sx={{ width: '80%' }}
      >
        <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
          Enter new column title
        </Typography>
        <TextValidator
          autoComplete="off"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="new-column-title"
          label="newColumnTitle"
          name="new-column-title"
          autoFocus
          value={newColumnTitle.title}
          validators={['required']}
          errorMessages={['this field is required', 'column title is not valid']}
        />

        <LoadingButton
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ marginBottom: '10px' }}
          type="submit"
          // disabled={auth.signInLoading}
          // loading={auth.signInLoading}
          loadingPosition="center"
        >
          Create column
        </LoadingButton>
      </ValidatorForm>{' '}
    </Grid>
  );
};

export default CreateColumnForm;