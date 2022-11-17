import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, getBoardById, getBoards } from 'store/boards/boards-thunks';
import store, { RootState } from 'store/store';
import { createColumn, getColumnById, getColumnsInBoard } from 'store/columns/columns-thunks';
import Column from './components/column';
import { createTask, getTasksInColumn } from 'store/tasks/tasks-thunk';
import { signIn, signUp } from 'store/auth/auth-thunks';

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
  }

  useEffect(() => {
    enterUser();
  }, []);

  const currentBoard = useSelector((state: RootState) => state.rootReducer.boardsReducer.boardById);
  const currentBoardColumns = useSelector((state: RootState) => state.rootReducer.columnsReducer.columns);

  const renderAllColumns = (): JSX.Element[] =>
    currentBoardColumns.map((column, index): JSX.Element => {
      return Column({ board: currentBoard, column: column, key: index });
    });

  // console.log('Board: ', boardData);
  // console.log('Columns: ', columnsData);

  return (
    <Grid container className="board__conteiner">
      <Grid item className="board__btn-conteiner" xl={0.8} xs={0.8}>
        <Link to="/">
          <Button className="board__back-btn" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>
            Back
          </Button>
        </Link>
        <Button className="board__create-board-btn" variant="contained" color="secondary" startIcon={<AddIcon />}>
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

  // return (
  //   <Grid container className="board__conteiner">
  //     <Grid item className="board__btn-conteiner" xl={0.8} xs={0.8}>
  //       <Link to="/">
  //         <Button className="board__back-btn" variant="contained" color="primary" startIcon={<ArrowBackIosIcon />}>
  //           Back
  //         </Button>
  //       </Link>
  //       <Button className="board__create-board-btn" variant="contained" color="secondary" startIcon={<AddIcon />}>
  //         Add column
  //       </Button>
  //     </Grid>
  //     <Grid container item className="column-conteiner" xl={11} xs={11}>
  //       <Typography className="board__title" variant="h4">
  //         {boardData.title}
  //       </Typography>
  //       <Grid container className="board__columns-layout">
  //         <Grid container item className="board__column" xl={3} xs={3}>
  //           <Typography variant="h5" className="column__title">
  //             First column
  //           </Typography>
  //           <Grid container className="column__tasks-conteiner">
  //             <Paper elevation={2} className="column__task">
  //               <Grid container item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   First task
  //                 </Typography>
  //               </Grid>
  //               <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Paper>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
  //               Create task
  //             </Button>
  //           </Grid>
  //           <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
  //             Delete column
  //           </Button>
  //         </Grid>
  //         <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
  //           <Typography variant="h5" className="column__title">
  //             Second column
  //           </Typography>
  //           <Grid container className="column__tasks-conteiner">
  //             <Grid container className="column__task">
  //               <Grid container item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   First task
  //                 </Typography>
  //               </Grid>
  //               <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
  //               Create task
  //             </Button>
  //           </Grid>
  //           <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
  //             Delete column
  //           </Button>
  //         </Grid>
  //         <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
  //           <Typography variant="h5" className="column__title">
  //             More column
  //           </Typography>
  //           <Grid container className="column__tasks-conteiner">
  //             <Grid container className="column__task">
  //               <Grid container item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   First task
  //                 </Typography>
  //               </Grid>
  //               <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
  //               Create task
  //             </Button>
  //           </Grid>
  //           <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
  //             Delete column
  //           </Button>
  //         </Grid>
  //         <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
  //           <Typography variant="h5" className="column__title">
  //             More column
  //           </Typography>
  //           <Grid container className="column__tasks-conteiner">
  //             <Grid container className="column__task">
  //               <Grid container item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   First task
  //                 </Typography>
  //               </Grid>
  //               <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
  //               Create task
  //             </Button>
  //           </Grid>
  //           <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
  //             Delete column
  //           </Button>
  //         </Grid>
  //         <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
  //           <Typography variant="h5" className="column__title">
  //             More column
  //           </Typography>
  //           <Grid container className="column__tasks-conteiner">
  //             <Grid container className="column__task">
  //               <Grid container item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   First task
  //                 </Typography>
  //               </Grid>
  //               <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
  //               Create task
  //             </Button>
  //           </Grid>
  //           <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
  //             Delete column
  //           </Button>
  //         </Grid>
  //         <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
  //           <Typography variant="h5" className="column__title">
  //             More column
  //           </Typography>
  //           <Grid container className="column__tasks-conteiner">
  //             <Grid container className="column__task">
  //               <Grid container item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   First task
  //                 </Typography>
  //               </Grid>
  //               <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Grid container className="column__task">
  //               <Grid item className="task__description-conteiner" xl={10} xs={10}>
  //                 <Typography className="task__description" variant="body1">
  //                   Second task is bigger than first to show it&apos;s move to the next string
  //                 </Typography>
  //               </Grid>
  //               <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
  //                 <Button
  //                   className="task__delete-btn"
  //                   variant="contained"
  //                   color="error"
  //                   startIcon={<DeleteIcon />}
  //                 ></Button>
  //               </Grid>
  //             </Grid>
  //             <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
  //               Create task
  //             </Button>
  //           </Grid>
  //           <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
  //             Delete column
  //           </Button>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // );
};

export default Board;
