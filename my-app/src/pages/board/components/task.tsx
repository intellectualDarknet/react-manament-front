import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Task(props: { task: ITask; key: number }): JSX.Element {
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
        <Button className="task__delete-btn" variant="contained" color="error" startIcon={<DeleteIcon />}></Button>
      </Grid>
    </Paper>
  );
}

export default Task;
