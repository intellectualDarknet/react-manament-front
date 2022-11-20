import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Task from './task';
import { Dispatch, FormEvent, SetStateAction } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';

function Column(props: {
  userId: string;
  board: IBoardResponse;
  column: IColumnResponse;
  tasks: ITask[];
  key: number;
  isChosenColumnTitle: boolean;
  deleteColumnByButtonPress: (columnId: string) => void;
  deleteTaskByButtonPress: (data: IGetTasksRequest) => void;
  toggleForm: () => void;
  setTaskIsChosen: Dispatch<SetStateAction<boolean>>;
  setClickedAddTaskColumnId: Dispatch<SetStateAction<string>>;
  showColumnTitleInput: (columnId: string) => void;
  currentColumnTitle: string;
  changeColumnTitleState: (inputValue: string) => void;
  changeColumnTitle: (column: IColumnResponse) => void;
}): JSX.Element {
  // TODO: Вернуть эту функцию, если в ней появится необходимость. Пока она вызывает ошибку
  // const sortTask = (tasks: ITask[]): ITask[] => {
  //   const sortedTasks = tasks.sort((a, b) => b.order - a.order);
  //   return sortedTasks;
  // };

  // const sortedTasks = sortTask(props.tasks);

  const filterTask = (tasks: ITask[]): ITask[] => {
    const filteredTasks = tasks.filter((elem) => elem.columnId === props.column._id);
    return filteredTasks;
  };

  const filteredTasks = filterTask(props.tasks);

  const deleteThisColumn = (): void => {
    props.deleteColumnByButtonPress(props.column._id);
  };

  const handleAddTask = (): void => {
    props.setTaskIsChosen((): boolean => true);
    props.setClickedAddTaskColumnId((): string => props.column._id);
    props.toggleForm();
  };

  const handleTitleClick = (): void => {
    props.showColumnTitleInput(props.column._id);
  };

  const onColumnTitleInputChange = (event: FormEvent<HTMLFormElement>): void => {
    props.changeColumnTitleState((event.target as HTMLInputElement).value);
  };

  const onColumnTitleInputSubmit = (): void => {
    props.changeColumnTitle(props.column);
  };

  return (
    <Grid container item className="board__column" xl={3} xs={3} key={props.key}>
      <Grid container item className="column__title-conteiner" onClick={handleTitleClick}>
        {props.isChosenColumnTitle ? (
          <Grid container item>
            <ValidatorForm
              onError={(errors) => console.log(errors)}
              onChange={onColumnTitleInputChange}
              onSubmit={onColumnTitleInputSubmit}
              noValidate
            >
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
                value={props.currentColumnTitle}
                validators={['required']}
                errorMessages={['this field is required', 'column title is not valid']}
              />
              <LoadingButton
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                // disabled={auth.signInLoading}
                // loading={auth.signInLoading}
                loadingPosition="center"
              >
                Change title
              </LoadingButton>
              <Button
                className="column__close-title-btn"
                // onClick={toggleForm}
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
              ></Button>
            </ValidatorForm>{' '}
          </Grid>
        ) : (
          <Typography variant="h5" className="column__title">
            {props.column.title}
          </Typography>
        )}
      </Grid>
      <Grid container className="column__tasks-conteiner">
        {filteredTasks.map((elem, index) =>
          Task({
            board: props.board,
            column: props.column,
            task: elem,
            key: index,
            deleteTaskByButtonPress: props.deleteTaskByButtonPress,
          })
        )}
        <Button
          className="task__create-btn"
          onClick={handleAddTask}
          variant="contained"
          color="secondary"
          endIcon={<AddIcon />}
        >
          Add task
        </Button>
      </Grid>
      <Button
        className="column__delete-btn"
        onClick={deleteThisColumn}
        variant="outlined"
        color="error"
        endIcon={<DeleteIcon />}
      >
        Delete column
      </Button>
    </Grid>
  );
}

export default Column;
