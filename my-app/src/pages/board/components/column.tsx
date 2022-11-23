import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import Task from './task';
import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteModal from 'components/deleteModal';
import DeleteColumnButton from './DeleteColumnButton';
import { useTranslation } from 'react-i18next';

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

  const handleTitleClick = (event: React.SyntheticEvent<HTMLElement>): void => {
    event.stopPropagation();
    props.changeColumnTitleState(props.column.title);
    props.showColumnTitleInput(props.column._id);
  };

  const onColumnTitleInputChange = (event: FormEvent<HTMLFormElement>): void => {
    props.changeColumnTitleState((event.target as HTMLInputElement).value);
  };

  const onColumnTitleInputSubmit = (event: FormEvent<Element>): void => {
    event.stopPropagation();
    props.changeColumnTitle(props.column);
  };

  const handleColumnTitleInputClose = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    props.showColumnTitleInput('');
  };

  return (
    <Grid container item className="board__column" xl={3} xs={3} key={props.key}>
      <Grid container item className="column__title-conteiner">
        {props.isChosenColumnTitle ? (
          <Grid container item className="column__title-form-conteiner">
            <ValidatorForm
              className="column__title-form"
              onError={(errors) => console.log(errors)}
              onChange={onColumnTitleInputChange}
              onSubmit={onColumnTitleInputSubmit}
              noValidate
            >
              <TextValidator
                className="column__title-input"
                // onBlur={handleColumnTitleInputClose}
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
              <ButtonGroup className="title-form__btn-group">
                <LoadingButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  // disabled={auth.signInLoading}
                  // loading={auth.signInLoading}
                  loadingPosition="center"
                >
                  Change title
                </LoadingButton>
                <Button
                  className="column__close-title-btn"
                  onClick={handleColumnTitleInputClose}
                  variant="contained"
                  color="error"
                >
                  <CloseIcon />
                </Button>
              </ButtonGroup>
            </ValidatorForm>{' '}
          </Grid>
        ) : (
          <Typography variant="h5" className="column__title" onClick={handleTitleClick}>
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
          Add column
        </Button>
      </Grid>
      <DeleteModal
        message="Are you sure, you want to delete this column?"
        submit={deleteThisColumn}
        deleteButton={DeleteColumnButton}
      />
    </Grid>
  );
}

export default Column;
