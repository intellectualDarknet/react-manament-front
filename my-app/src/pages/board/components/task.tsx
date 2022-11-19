import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Task(props: {
  board: IBoardResponse;
  column: IColumnResponse;
  task: ITask;
  key: number;
  deleteTaskByButtonPress: (data: IGetTasksRequest) => void;
}): JSX.Element {
  const deleteThisTask = () => {
    props.deleteTaskByButtonPress({ boardId: props.board._id, columnId: props.column._id, taskId: props.task._id });
  };

  return (
    <Paper elevation={2} className="column__task" key={props.key}>
      <Grid container item className="task__description-conteiner" xl={10} xs={10}>
        <Typography className="task__description" variant="h6">
          {props.task.title}
        </Typography>
        <Typography className="task__description" variant="body1">
          {props.task.description}
        </Typography>
      </Grid>
      <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
        <Button
          className="task__delete-btn"
          onClick={deleteThisTask}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        ></Button>
      </Grid>
    </Paper>
  );
}

export default Task;
