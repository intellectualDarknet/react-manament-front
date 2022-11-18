import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, getBoardById, getBoards } from 'store/boards/boards-thunks';
import store, { RootState } from 'store/store';
import { createColumn, deleteColumn, getColumnById, getColumnsInBoard } from 'store/columns/columns-thunks';
import Column from './components/column';
import { createTask, deleteTask, getTasksByBoardId } from 'store/tasks/tasks-thunk';
import { signIn } from 'store/auth/auth-thunks';
import { getUserById } from 'store/users/users-thunks';
import { ICreateTaskData } from './boards-types';

const Board = (): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>();
  // TODO: Состыковать эту борду со страницей выбора бордов
  // Общие функции типа getBoard и getUser будут запустаться на
  // Общей странице бородов
  // Здесь нужно будет только получить борду и пользователя
  // Из стореджа
  // Но все нужно проверять уже совместно

  let boardId: string; // TODO: Получить ключ из базы данных

  async function enterUser() {
    await dispatch(getUserById());
    await dispatch(getBoardById(store.getState().rootReducer.boardsReducer.));
    await dispatch(getColumnsInBoard(store.getState().rootReducer.boardsReducer.boardById._id));
    await dispatch(getTasksByBoardId(boardId));
  }

  useEffect(() => {
    enterUser();
  }, []);

  const currentUser = useSelector((state: RootState) => state.rootReducer.usersReducer.userById);
  const currentBoard = useSelector((state: RootState) => state.rootReducer.boardsReducer.boardById);
  const currentBoardColumns = useSelector((state: RootState) => state.rootReducer.columnsReducer.columns);
  const currentBoardTasks = useSelector((state: RootState) => state.rootReducer.tasksReducer.getTasksByBoardId);

  const deleteColumnByButtonPress = (columnId: string): void => {
    dispatch(deleteColumn({ boardId, columnId }));
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
    console.log('Create task: ', userId, boardId, columnId);
    await dispatch(getTasksByBoardId(boardId));
  };

  const deleteTaskByButtonPress = async ({ boardId, columnId, taskId }: IGetTasksRequest): Promise<void> => {
    await dispatch(deleteTask({ boardId, columnId, taskId }));
    console.log('Delete task: ', boardId, columnId, taskId);
    await dispatch(getTasksByBoardId(boardId));
  };

  const renderAllColumns = (): JSX.Element[] =>
    currentBoardColumns.map((column, index): JSX.Element => {
      return Column({
        user: currentUser,
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
        boardId,
        title: 'First column',
        order: 0,
      })
    );
  };

  return (
    <Grid container className="board__conteiner">
      <Grid item className="board__btn-conteiner" xl={0.8} xs={0.8}>
        <Link to="/">
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
