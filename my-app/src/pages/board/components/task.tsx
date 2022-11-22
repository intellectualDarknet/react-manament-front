import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import DeleteModal from 'components/deleteModal';
import DeleteTaskButton from './DeleteTaskButton';

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
        <DeleteModal
          message="Are you sure, you want to delete this task?"
          submit={deleteThisTask}
          deleteButton={DeleteTaskButton}
        />
      </Grid>
    </Paper>
  );
}

export default Task;
