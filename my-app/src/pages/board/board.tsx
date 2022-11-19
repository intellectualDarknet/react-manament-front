import react, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import store, { RootState } from 'store/store';
import { createColumn, deleteColumn, getColumnsInBoard } from 'store/columns/columns-thunks';
import Column from './components/column';
import { createTask, deleteTask, getTasksByBoardId } from 'store/tasks/tasks-thunk';
import { ICreateTaskData } from './boards-types';

const Board = (): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>();

  async function getData() {
    const boardId = store.getState().rootReducer.boardsReducer.boardById._id;
    await dispatch(getColumnsInBoard(boardId));
    await dispatch(getTasksByBoardId(boardId));
  }

  useEffect(() => {
    getData();
  }, []);

  const userId = useSelector((state: RootState) => state.rootReducer.authReducer.userId);
  const currentBoard = useSelector((state: RootState) => state.rootReducer.boardsReducer.boardById);
  const currentBoardColumns = useSelector((state: RootState) => state.rootReducer.columnsReducer.columns);
  const currentBoardTasks = useSelector((state: RootState) => state.rootReducer.tasksReducer.getTasksByBoardId);

  const deleteColumnByButtonPress = (columnId: string): void => {
    dispatch(deleteColumn({ boardId: currentBoard._id, columnId }));
  };

  const createTaskByButtonPress = async ({ userId, boardId, columnId }: ICreateTaskData): Promise<void> => {
    await dispatch(
      createTask({
        boardId,
        columnId,
        title: 'It is the task!',
        order: 0,
        description: 'Just a simple test task',
        userId: 0,
        users: [userId],
      })
    );
    await dispatch(getTasksByBoardId(boardId));
  };

  const deleteTaskByButtonPress = async ({ boardId, columnId, taskId }: IGetTasksRequest): Promise<void> => {
    await dispatch(deleteTask({ boardId, columnId, taskId }));
    await dispatch(getTasksByBoardId(boardId));
  };

  const renderAllColumns = (): JSX.Element[] =>
    currentBoardColumns.map((column, index): JSX.Element => {
      return Column({
        userId,
        board: currentBoard,
        column,
        tasks: currentBoardTasks,
        key: index,
        deleteColumnByButtonPress,
        createTaskByButtonPress,
        deleteTaskByButtonPress,
      });
    });

  // TODO: Добавить запрос названия колонки в модальном окне
  const addColumn = (): void => {
    dispatch(
      createColumn({
        boardId: currentBoard._id,
        title: 'First column',
        order: 0,
      })
    );
  };

  return (
    <Grid container className="board__conteiner">
      <Grid item className="board__btn-conteiner" xl={0.8} xs={0.8}>
        <Link to="/boards">
          <Button className="board__back-btn" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>
            Back
          </Button>
        </Link>
        <Button
          className="board__create-board-btn"
          onClick={addColumn}
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
        >
          Add column
        </Button>
      </Grid>
      <Grid container item className="column-conteiner" xl={11} xs={11}>
        <Typography className="board__title" variant="h4">
          {currentBoard ? currentBoard.title : 'No board chosen'}
        </Typography>
        <Grid container className="board__columns-layout">
          {renderAllColumns()}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
