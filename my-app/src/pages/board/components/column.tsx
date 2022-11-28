import React, { Dispatch, DragEvent, FormEvent, SetStateAction } from 'react';
import Task from './task';
import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import CloseIcon from '@mui/icons-material/Close';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteModal from 'components/deleteModal';
import DeleteColumnButton from './DeleteColumnButton';
import { DragItemType, IColumnState, IDragItemState, ITaskState } from '../board';
import CircularProgress from '@mui/material/CircularProgress';

function Column(props: {
  userId: string;
  board: IBoardResponse;
  column: IColumnResponse;
  tasks: Map<string, ITask[]>;
  key: number;
  isChosenColumnTitle: boolean;
  columnTranslation: {
    columnNewTitle: string;
    changeTitle: string;
    columnDeleteMessage: string;
  };
  taskTranslation: { addTaskBtnTitle: string; taskDeleteMessage: string };
  columnIsLoading: boolean;
  tasksIsLoading: boolean;
  deleteColumnByButtonPress: (columnId: string) => void;
  deleteTaskByButtonPress: (data: IGetTasksRequest) => void;
  toggleForm: () => void;
  setTaskIsChosen: Dispatch<SetStateAction<boolean>>;
  setClickedAddTaskColumnId: Dispatch<SetStateAction<string>>;
  setDragItem: Dispatch<SetStateAction<IDragItemState>>;
  setDropColumn: Dispatch<SetStateAction<IColumnState>>;
  setDropTask: Dispatch<SetStateAction<ITaskState>>;
  showColumnTitleInput: (columnId: string) => void;
  currentColumnTitle: string;
  changeColumnTitleState: (inputValue: string) => void;
  changeColumnTitle: (column: IColumnResponse) => void;
}): JSX.Element {
  const filterTask = (tasks: ITask[]): ITask[] => {
    const tasksOfCurrentColumn = tasks.filter((elem) => elem.columnId === props.column._id);
    return tasksOfCurrentColumn;
  };

  const tasksOfCurrentColumn = filterTask(props.tasks.get(props.column._id));

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

  const dragStartHandler = (event: DragEvent<HTMLElement>) => {
    props.setDragItem({
      type: DragItemType.COLUMN,
      columnId: (event.target as HTMLElement).dataset.columnId,
      taskId: '',
      order: (event.target as HTMLElement).dataset.columnOrder,
    });
    (event.target as HTMLElement).classList.add('board__column_dragged');
  };

  const dragEndHandler = (event: DragEvent<HTMLElement>) => {
    (event.target as HTMLElement).classList.remove('board__column_dragged');
  };

  const dragOverHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropColumn = dropPath.find((column) => column.dataset.columnOrder);
    if (!dropColumn.classList.contains('board__column_dragged')) {
      dropColumn.classList.add('board__column_hovered');
    }
  };

  const dragLeaveHandler = (event: DragEvent<HTMLElement>) => {
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropColumn = dropPath.find((column) => column.dataset.columnOrder);
    if (!dropColumn.classList.contains('board__column_dragged')) {
      dropColumn.classList.remove('board__column_hovered');
    }
  };

  const dropHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropColumn = dropPath.find((column) => column.dataset.columnOrder);
    if (dropColumn) {
      props.setDropColumn({ columnId: dropColumn.dataset.columnId, columnOrder: dropColumn.dataset.columnOrder });
      dropColumn.classList.remove('board__column_hovered');
    }
  };

  const showColumnTitle = (columnIsLoading: boolean): JSX.Element => {
    if (columnIsLoading) {
      return (
        <Grid container className="column__title-loading">
          <CircularProgress color="secondary" />
        </Grid>
      );
    } else {
      return (
        <Typography variant="h5" className="column__title" onClick={handleTitleClick}>
          {props.column.title}
        </Typography>
      );
    }
  };

  return (
    <Grid
      container
      item
      className="board__column"
      xl={3}
      xs={3}
      key={props.key}
      data-column-id={props.column._id}
      data-column-order={props.column.order}
      draggable={true}
      onDragStart={(event: DragEvent<HTMLElement>) => {
        dragStartHandler(event);
      }}
      onDragEnd={(event: DragEvent<HTMLElement>) => {
        dragEndHandler(event);
      }}
      onDragOver={(event: DragEvent<HTMLElement>) => {
        dragOverHandler(event);
      }}
      onDragLeave={(event: DragEvent<HTMLElement>) => {
        dragLeaveHandler(event);
      }}
      onDrop={(event: DragEvent<HTMLElement>) => {
        dropHandler(event);
      }}
    >
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
                label={props.columnTranslation.columnNewTitle}
                name="column-title"
                autoFocus
                value={props.currentColumnTitle}
                validators={['required']}
                errorMessages={['this field is required', 'column title is not valid']}
              />
              <ButtonGroup className="title-form__btn-group">
                <Button variant="contained" color="primary" type="submit">
                  {props.columnTranslation.changeTitle}
                </Button>
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
          showColumnTitle(props.columnIsLoading)
        )}
      </Grid>
      <Grid container className="column__tasks-conteiner">
        {props.tasksIsLoading ? (
          <Grid container className="column__tasks-loading">
            <CircularProgress color="secondary" />
          </Grid>
        ) : (
          tasksOfCurrentColumn.map((elem, index) => {
            return Task({
              board: props.board,
              column: props.column,
              task: elem,
              key: index,
              taskTranslation: props.taskTranslation,
              setDragItem: props.setDragItem,
              setDropTask: props.setDropTask,
              deleteTaskByButtonPress: props.deleteTaskByButtonPress,
            });
          })
        )}
        <Button
          className="task__create-btn"
          onClick={handleAddTask}
          variant="contained"
          color="secondary"
          endIcon={<AddIcon />}
        >
          {props.taskTranslation.addTaskBtnTitle}
        </Button>
      </Grid>
      <DeleteModal
        message={props.columnTranslation.columnDeleteMessage}
        submit={deleteThisColumn}
        deleteButton={DeleteColumnButton}
      />
    </Grid>
  );
}

export default Column;
