import React, { Dispatch, DragEvent, TouchEvent, FormEvent, SetStateAction } from 'react';
import Task from './Task';
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
  key: string;
  isChosenColumnTitle: boolean;
  currentColumnTitle: string;
  columnTranslation: {
    columnNewTitle: string;
    changeTitle: string;
    columnDeleteMessage: string;
  };
  taskTranslation: {
    taskNewTitle: string;
    taskNewDescription: string;
    changeTaskBtnTitle: string;
    addTaskBtnTitle: string;
    taskDeleteMessage: string;
  };
  columnIsLoading: boolean;
  tasksIsLoading: boolean;
  clickedEditTaskId: string;
  currentTaskContent: { title: string; description: string };
  dragItem: { type: DragItemType; columnId: string; taskId: string; order: string };
  deleteColumnByButtonPress: (columnId: string) => void;
  deleteTaskByButtonPress: (data: IGetTasksRequest) => void;
  toggleForm: () => void;
  setTaskIsChosen: Dispatch<SetStateAction<boolean>>;
  setClickedAddTaskColumnId: Dispatch<SetStateAction<string>>;
  setClickedEditTaskId: Dispatch<SetStateAction<string>>;
  setDragItem: Dispatch<SetStateAction<IDragItemState>>;
  setDropColumn: Dispatch<SetStateAction<IColumnState>>;
  setDropTask: Dispatch<SetStateAction<ITaskState>>;
  showColumnTitleInput: (columnId: string) => void;
  changeColumnTitleState: (inputValue: string) => void;
  changeTaskContentState: (inputValues: { title: string; description: string }) => void;
  changeColumnTitle: (column: IColumnResponse) => void;
  changeTaskContent: (task: ITask) => void;
}): JSX.Element {
  const tasksOfCurrentColumn = props.tasks.get(props.column._id);

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

  const handleColumnTitleInputChange = (event: FormEvent<HTMLFormElement>): void => {
    props.changeColumnTitleState((event.target as HTMLInputElement).value);
  };

  const handleColumnTitleInputSubmit = (event: FormEvent<Element>): void => {
    event.stopPropagation();
    props.changeColumnTitle(props.column);
  };

  const handleColumnTitleInputClose = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    props.showColumnTitleInput('');
  };

  const dragStartHandler = (event: DragEvent<HTMLElement>) => {
    const columnId = (event.target as HTMLElement).dataset.columnId;
    const order = (event.target as HTMLElement).dataset.columnOrder;
    setDragItem(DragItemType.COLUMN, columnId, order);
    (event.target as HTMLElement).classList.add('board__column_dragged');
  };

  const handleTouch = (event: TouchEvent<HTMLDivElement>) => {
    const touchPath = event.nativeEvent.composedPath() as HTMLElement[];
    const touchColumn = touchPath.find((elem) => elem.dataset.columnId);
    const touchTaskCreateBtn = touchPath.find((elem) => {
      if (elem.classList) {
        return elem.classList.contains('task__create-btn');
      }
    });
    const touchColumnDeleteBtn = touchPath.find((elem) => {
      if (elem.classList) {
        return elem.classList.contains('column__delete-btn');
      }
    });
    if (!touchTaskCreateBtn && !touchColumnDeleteBtn) {
      const columnId = touchColumn.dataset.columnId;
      const columnOrder = touchColumn.dataset.columnOrder;
      if (props.dragItem.type === DragItemType.NONE && !touchColumn.classList.contains('board__column_dragged')) {
        setDragItem(DragItemType.COLUMN, columnId, columnOrder);
        touchColumn.classList.add('board__column_dragged');
      } else if (touchColumn.classList.contains('board__column_dragged')) {
        setDragItem(DragItemType.NONE, '', '');
        touchColumn.classList.remove('board__column_dragged');
      } else if (props.dragItem.type === DragItemType.COLUMN) {
        props.setDropColumn({ columnId, columnOrder });
      }
    }
  };

  const setDragItem = (type: DragItemType, columnId: string, order: string) => {
    props.setDragItem({
      type,
      columnId,
      taskId: '',
      order,
    });
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
      dropColumn.classList.remove('board__column_hovered');
      props.setDropColumn({ columnId: dropColumn.dataset.columnId, columnOrder: dropColumn.dataset.columnOrder });
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
        <Typography variant="h5" className="column__title" sx={{ fontFamily: 'monospace' }} onClick={handleTitleClick}>
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
      xs={2}
      sm={3}
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
      onTouchEnd={(event: TouchEvent<HTMLDivElement>) => handleTouch(event)}
    >
      <Grid
        container
        item
        className="column__title-conteiner"
        onTouchEnd={(event: TouchEvent<HTMLDivElement>) => {
          event.stopPropagation();
        }}
      >
        {props.isChosenColumnTitle ? (
          <Grid container item className="column__title-form-conteiner">
            <ValidatorForm
              className="column__title-form"
              onChange={handleColumnTitleInputChange}
              onSubmit={handleColumnTitleInputSubmit}
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
                  className="column__close-input-btn"
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
          tasksOfCurrentColumn.map((task) => {
            let isChosenTask = false;
            if (props.clickedEditTaskId === task._id) {
              isChosenTask = true;
            }
            return Task({
              board: props.board,
              column: props.column,
              task: task,
              key: task._id,
              taskTranslation: props.taskTranslation,
              isChosenTask,
              currentTaskContent: props.currentTaskContent,
              dragItem: props.dragItem,
              setDragItem: props.setDragItem,
              setDropTask: props.setDropTask,
              setClickedEditTaskId: props.setClickedEditTaskId,
              deleteTaskByButtonPress: props.deleteTaskByButtonPress,
              changeTaskContentState: props.changeTaskContentState,
              changeTaskContent: props.changeTaskContent,
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
