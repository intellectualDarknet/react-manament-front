import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { Add as AddIcon, ArrowBackIos as ArrowBackIosIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { getBoardById } from 'store/boards/boards-thunks';
import store from 'store/store';
import { getColumnsInBoard } from 'store/columns/columns-thunks';
import Column from './components/column';
import { getTasksInColumn } from 'store/tasks/tasks-thunk';

const Board = (props: {boardId: string}): JSX.Element => {
  const dispatch = useDispatch<typeof store.dispatch>(); 

  const boardData = dispatch(getBoardById(props.boardId)); // TODO: Получить boardId из state
  const columnsData = dispatch(getColumnsInBoard(props.boardId));

  const renderAllColumns = (): JSX.Element => columnsData.map((column): JSX.Element => {
    const tasksData = dispatch(getTasksInColumn({ boardId: boardData._id, columnId: column._id }));
    return Column({ column: column, tasks: tasksData });
  });

  console.log('Board: ', boardData);
  console.log('Columns: ', columnsData);

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
          {boardData.title}
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
