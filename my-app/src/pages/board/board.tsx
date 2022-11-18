import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, getBoardById, getBoards } from 'store/boards/boards-thunks';
import store, { RootState } from 'store/store';
import { createColumn, deleteColumn, getColumnById, getColumnsInBoard } from 'store/columns/columns-thunks';
import Column from './components/column';
import { createTask, deleteTask, getTasksByBoardId, getTasksInColumn } from 'store/tasks/tasks-thunk';
import { signIn, signUp } from 'store/auth/auth-thunks';
import { getUserById } from 'store/users/users-thunks';

export interface ICreateTaskData {
  userId: string;
  boardId: string;
  columnId: string;
}

const Board = (): JSX.Element => {
  // const Board = (props: {boardId: string}): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>();
  let boardId: string;

  // This is the test example. TODO: Delete this later
  async function enterUser() {
    const name = 'Batman';
    const login = 'BW';
    const password = 'ImDaBatman123';
    // const creation = await dispatch(signUp({ name, login, password })).unwrap();
    // console.log('User creates: ', creation);
    await dispatch(signIn({ login, password })).unwrap();
    const userId = store.getState().rootReducer.authReducer.userId;
    const token = store.getState().rootReducer.authReducer.token;
    console.log('User ID: ', userId);
    console.log('Token: ', token);
    await dispatch(getUserById(userId));
    await dispatch(getBoards());
    console.log('All Boards: ', store.getState().rootReducer.boardsReducer.boards);
    const newBoard = await dispatch(
      createBoard({
        title: 'Test board',
        owner: userId,
        users: [userId],
      })
    );
    console.log('newBoard: ', newBoard);
    boardId = (newBoard.payload as IBoardResponse)._id;
    const column1 = await dispatch(
      createColumn({
        boardId,
        title: 'First column',
        order: 0,
      })
    );
    const column2 = await dispatch(
      createColumn({
        boardId,
        title: 'Second column',
        order: 1,
      })
    );
    console.log('New columns:', column1, column2);

    await dispatch(getBoardById(boardId));
    console.log('Current board: ', store.getState().rootReducer.boardsReducer.boardById);
    await dispatch(getColumnsInBoard(store.getState().rootReducer.boardsReducer.boardById._id));
    console.log('Columns of the board: ', store.getState().rootReducer.columnsReducer.columns);

    await dispatch(
      getColumnById({
        boardId: store.getState().rootReducer.boardsReducer.boardById._id,
        columnId: (column2.payload as IColumnResponse)._id,
      })
    );
    console.log('Current column: ', store.getState().rootReducer.columnsReducer.getColumnById);
    const newTask = await dispatch(
      createTask({
        boardId: store.getState().rootReducer.boardsReducer.boardById._id,
        columnId: store.getState().rootReducer.columnsReducer.getColumnById._id,
        title: 'It is the task!',
        order: 0,
        description: 'Just a simple test task',
        userId: 0,
        users: [userId],
      })
    );
    console.log('NewTask: ', newTask);
    await dispatch(
      createTask({
        boardId: store.getState().rootReducer.boardsReducer.boardById._id,
        columnId: store.getState().rootReducer.columnsReducer.getColumnById._id,
        title: 'One more task!',
        order: 1,
        description: 'Just another test task',
        userId: 0,
        users: [userId],
      })
    );
    await dispatch(getTasksByBoardId(boardId));
    console.log('All tasks of the board: ', store.getState().rootReducer.tasksReducer.getTasksByBoardId);
  }

  useEffect(() => {
    enterUser();
    console.log('rerander!!!');
  }, [store.getState().rootReducer.tasksReducer.getTaskById]);

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
