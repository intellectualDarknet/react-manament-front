import react, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'store/store';
import Column from './components/column';
import CreateColumnForm from './components/create-column-form';
import CreateTaskForm from './components/create-task-form';
import { deleteColumn, getColumnsInBoard, updateColumnById } from 'store/columns/columns-thunks';
import { getTasksByBoardId, deleteTask } from 'store/tasks/tasks-thunk';
import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import useResortColumnArr from './functions/use-resort-column-arr';
import { useTranslation } from 'react-i18next';
import sortTasks from './functions/sort-tasks';
import useResortTasksArr from './functions/use-resort-tasks-arr';
import useMoveTask from './functions/use-move-task';

export interface ITaskState {
  columnId: string;
  taskId: string;
  taskOrder: string;
}

export interface IColumnState {
  columnId: string;
  columnOrder: string;
}

export enum DragItemType {
  COLUMN = 'column',
  TASK = 'task',
  NONE = '',
}

export interface IDragItemState {
  type: DragItemType;
  columnId: string;
  taskId: string;
  order: string;
}

const Board = (): JSX.Element => {
  const { t } = useTranslation();
  const columnTranslation = {
    columnNewTitle: t('board.columnNewTitle'),
    changeTitle: t('board.changeTitle'),
    columnDeleteMessage: t('board.deleteMessage', { item: 'column', itemRu: 'колонку' }),
  };
  const taskTranslation = {
    addTaskBtnTitle: t('board.addTask'),
    taskDeleteMessage: t('board.deleteMessage', { item: 'task', itemRu: 'задачу' }),
  };
  const dispatch = useDispatch<typeof store.dispatch>();

  async function getData() {
    const boardId = store.getState().rootReducer.boardsReducer.boardById?._id;
    if (boardId) {
      await dispatch(getColumnsInBoard(boardId));
      await dispatch(getTasksByBoardId(boardId));
    }
  }

  useEffect((): void => {
    getData();
  }, []);

  const userId = useSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const currentBoard = useSelector((state: RootState) => state.rootReducer.boardsReducer.boardById);
  const currentBoardColumns = useSelector((state: RootState) => state.rootReducer.columnsReducer.columns);
  const currentBoardColumnsCount = currentBoardColumns.length;
  const currentBoardTasks = useSelector((state: RootState) => state.rootReducer.tasksReducer.getTasksByBoardId);
  useResortTasksArr(currentBoard, currentBoardColumns, currentBoardTasks);
  const sortedTasks = sortTasks(currentBoardColumns, currentBoardTasks);
  const allColumnsIsGetting = useSelector((state: RootState) => state.rootReducer.columnsReducer.columnsLoading);
  const allColumnsIsUpdating = useSelector(
    (state: RootState) => state.rootReducer.columnsReducer.updateSetOfColumnsLoading
  );
  const oneColumnIsUpdating = useSelector(
    (state: RootState) => state.rootReducer.columnsReducer.updateColumnByIdLoading
  );
  const oneColumnIsDeleting = useSelector((state: RootState) => state.rootReducer.columnsReducer.deleteColumnLoading);
  const allTasksIsGetting = useSelector((state: RootState) => state.rootReducer.tasksReducer.getTasksByBoardIdLoading);
  const allTasksIsUpdating = useSelector((state: RootState) => state.rootReducer.tasksReducer.updateTasksByIdsLoading);
  const oneTaskIsDeleting = useSelector((state: RootState) => state.rootReducer.tasksReducer.deleteTasksLoading);
  const isLoading =
    allColumnsIsGetting ||
    oneColumnIsUpdating ||
    allColumnsIsUpdating ||
    oneColumnIsDeleting ||
    allTasksIsGetting ||
    allTasksIsUpdating ||
    oneTaskIsDeleting;
  console.log(
    allColumnsIsGetting,
    oneColumnIsUpdating,
    allColumnsIsUpdating,
    oneColumnIsDeleting,
    allTasksIsGetting,
    allTasksIsUpdating,
    oneTaskIsDeleting,
    'isLoding: ',
    isLoading
  );

  const [formIsShown, setFormIsShown] = useState(false);
  const [taskIsChosen, setTaskIsChosen] = useState(false);
  const [clickedAddTaskColumnId, setClickedAddTaskColumnId] = useState('');
  const [clickedEditTitleColumnId, setClickedEditTitleColumnId] = useState('');
  const [currentColumnTitle, setCurrentColumnTitle] = useState('');
  const [dragItem, setDragItem] = useState({ type: DragItemType.NONE, columnId: '', taskId: '', order: '' });
  const [dropColumn, setDropColumn] = useState({ columnId: '', columnOrder: '' });
  const [dropTask, setDropTask] = useState({ columnId: '', taskId: '', taskOrder: '' });

  useMoveTask(currentBoard, dragItem, dropTask, dropColumn, setDragItem, setDropColumn, setDropTask, currentBoardTasks);

  const deleteColumnByButtonPress = (columnId: string): void => {
    dispatch(deleteColumn({ boardId: currentBoard._id, columnId }));
  };

  const deleteTaskByButtonPress = async ({ boardId, columnId, taskId }: IGetTasksRequest): Promise<void> => {
    await dispatch(deleteTask({ boardId, columnId, taskId }));
    await dispatch(getTasksByBoardId(boardId));
  };

  const toggleForm = (): void => {
    if (formIsShown) {
      setFormIsShown(false);
    } else {
      setFormIsShown(true);
    }
  };

  const handleAddColumn = (): void => {
    setTaskIsChosen((): boolean => false);
    toggleForm();
  };

  const showColumnTitleInput = (columnId: string): void => {
    setClickedEditTitleColumnId((): string => {
      return columnId;
    });
  };

  const changeColumnTitleState = (inputValue: string): void => {
    setCurrentColumnTitle((): string => {
      return inputValue;
    });
  };

  const changeColumnTitle = async (column: IColumnResponse): Promise<void> => {
    await dispatch(
      updateColumnById({
        boardId: currentBoard._id,
        columnId: column._id,
        title: currentColumnTitle,
        order: column.order,
      })
    );
    changeColumnTitleState('');
    showColumnTitleInput('');
  };

  const getNewOrder = (dragItem: IDragItemState, dropColumn: IColumnState): number[] => {
    let newOrder = [];
    for (let i = 0; i < currentBoardColumnsCount; i += 1) {
      newOrder.push(i);
    }
    if (dragItem.type === DragItemType.COLUMN && dropColumn.columnOrder) {
      newOrder = newOrder.map((elem, index) => {
        if (index === +dragItem.order) {
          return +dropColumn.columnOrder;
        } else if (index === +dropColumn.columnOrder) {
          return +dragItem.order;
        }
        return index;
      });
      setDragItem({ type: DragItemType.NONE, columnId: '', taskId: '', order: '' });
      setDropColumn({ columnId: '', columnOrder: '' });
    }
    return newOrder;
  };

  useResortColumnArr(currentBoardColumns, getNewOrder(dragItem, dropColumn));

  const renderAllColumns = (boardColumns: IColumnResponse[]): JSX.Element[] =>
    boardColumns.map((column, index): JSX.Element => {
      let isChosenColumnTitle = false;
      if (clickedEditTitleColumnId === column._id) {
        isChosenColumnTitle = true;
      }
      return Column({
        userId,
        board: currentBoard,
        column,
        tasks: sortedTasks,
        key: index,
        isChosenColumnTitle,
        currentColumnTitle,
        columnTranslation,
        taskTranslation,
        deleteColumnByButtonPress,
        deleteTaskByButtonPress,
        toggleForm,
        setTaskIsChosen,
        setClickedAddTaskColumnId,
        setDragItem,
        setDropColumn,
        setDropTask,
        showColumnTitleInput,
        changeColumnTitleState,
        changeColumnTitle,
      });
    });

  return (
    <Grid container className="board__conteiner">
      <Grid item className="board__btn-conteiner" xl={0.8} xs={0.8}>
        <Link to="/boards">
          <Button className="board__back-btn" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>
            {t('board.back')}
          </Button>
        </Link>
        <Button
          className="board__create-board-btn"
          onClick={handleAddColumn}
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          {t('board.addColumn')}
        </Button>
      </Grid>
      <Grid container item className="column-conteiner" xl={11} xs={11}>
        <Grid
          container
          item
          className={formIsShown ? 'board__form' : 'board__form board__form_hidden'}
          xl={2.2}
          xs={2.2}
          component={Paper}
        >
          <Button
            className="board-form__close-btn"
            onClick={toggleForm}
            variant="outlined"
            color="error"
            startIcon={<CloseIcon />}
          ></Button>
          {taskIsChosen ? (
            <CreateTaskForm
              userId={userId}
              board={currentBoard}
              columnId={clickedAddTaskColumnId}
              sortedTasks={sortedTasks}
              toggleForm={toggleForm}
            />
          ) : (
            <CreateColumnForm
              board={currentBoard}
              currentBoardColumnsCount={currentBoardColumnsCount}
              toggleForm={toggleForm}
            />
          )}
        </Grid>
        <Typography className="board__title" variant="h4">
          {currentBoard ? currentBoard.title : t('board.unchoisen')}
        </Typography>
        <Grid container className="board__columns-layout">
          {isLoading ? 'Loading...' : renderAllColumns(currentBoardColumns)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
