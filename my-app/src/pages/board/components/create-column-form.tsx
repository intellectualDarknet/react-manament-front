import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FormEvent, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { IAuthState } from 'store/auth/auth-slice';
import { createColumn } from 'store/columns/columns-thunks';

interface IColumnTitle {
  title: string;
}

const CreateColumnForm = (props: { board: IGetBoardResponse; toggleForm: () => void }): JSX.Element => {
  const auth: IAuthState = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  const dispatch = useAppDispatch();
  const [columnTitle, setColumnTitle] = useState<IColumnTitle>({ title: '' });
  const onColumnTitleSubmit = () => {
    dispatch(
      createColumn({
        boardId: props.board._id,
        title: columnTitle.title,
        order: 0,
      })
    );
    setColumnTitle(() => {
      return { title: '' };
    });
    props.toggleForm();
  };

  function onFormChange(e: FormEvent<HTMLFormElement>) {
    const value = (e.target as HTMLInputElement).value;
    setColumnTitle(() => {
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
          id="column-title"
          label="columnTitle"
          name="column-title"
          autoFocus
          value={columnTitle.title}
          validators={['required']}
          errorMessages={['this field is required', 'column title is not valid']}
        />

        <LoadingButton
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ marginBottom: '10px' }}
          type="submit"
          disabled={auth.signInLoading}
          loading={auth.signInLoading}
          loadingPosition="center"
        >
          Create column
        </LoadingButton>
      </ValidatorForm>{' '}
    </Grid>
  );
};

export default CreateColumnForm;
