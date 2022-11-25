import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, { FormEvent, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { RootState, useAppDispatch, useAppSelector } from 'store/store';
import { IAuthState } from 'store/auth/auth-slice';
import { createColumn } from 'store/columns/columns-thunks';
import { createTask, getTasksByBoardId } from 'store/tasks/tasks-thunk';
import { useTranslation } from 'react-i18next';

interface ITaskState {
  title: string;
  description: string;
}

const CreateTaskForm = (props: {
  userId: string;
  board: IGetBoardResponse;
  columnId: string;
  sortedTasks: Map<string, ITask[]>;
  toggleForm: () => void;
}): JSX.Element => {
  // const auth: IAuthState = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  // TODO: Заменить на переменную загрузки таска
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [taskState, setTaskState] = useState<ITaskState>({ title: '', description: '' });
  const onColumnTitleSubmit = async () => {
    await dispatch(
      createTask({
        boardId: props.board._id,
        columnId: props.columnId,
        title: taskState.title,
        order: props.sortedTasks.get(props.columnId).length,
        description: taskState.description,
        userId: 0, // Здесь ошибка типа на бэкенде
        users: [props.userId],
      })
    );
    await dispatch(getTasksByBoardId(props.board._id));
    setTaskState(() => {
      return { title: '', description: '' };
    });
    props.toggleForm();
  };

  function onFormChange(e: FormEvent<HTMLFormElement>) {
    const field = (e.target as HTMLInputElement).id;
    const value = (e.target as HTMLInputElement).value;
    setTaskState((formValues) => {
      return {
        ...formValues,
        [field]: value,
      };
    });
  }

  return (
    <Grid
      item
      className="board__create_task_form"
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
          {t('board.title', { item: 'task', itemRu: 'задания' })}
        </Typography>
        <TextValidator
          autoComplete="off"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="taskTitle"
          name="task-title"
          autoFocus
          value={taskState.title}
          validators={['required']}
          errorMessages={['this field is required', 'task title is not valid']}
        />
        <TextValidator
          autoComplete="off"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="taskDescription"
          name="task-Description"
          value={taskState.description}
          validators={['required']}
          errorMessages={['this field is required', 'task description is not valid']}
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
          Create task
        </LoadingButton>
      </ValidatorForm>{' '}
    </Grid>
  );
};

export default CreateTaskForm;
