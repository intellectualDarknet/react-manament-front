import React from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Task from './task';

function Column(props: { board: IBoardResponse; column: IColumnResponse; tasks: ITask[]; key: number }): JSX.Element {
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

  return (
    <Grid container item className="board__column" xl={3} xs={3} key={props.key}>
      <Typography variant="h5" className="column__title">
        {props.column.title}
      </Typography>
      <Grid container className="column__tasks-conteiner">
        {filteredTasks.map((elem, index) => Task({ task: elem, key: index }))}
        <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
          Create task
        </Button>
      </Grid>
      <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
        Delete column
      </Button>
    </Grid>
  );
}

export default Column;
