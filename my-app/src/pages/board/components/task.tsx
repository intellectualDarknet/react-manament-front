import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Task(): JSX.Element {
  return (
    <Paper elevation={2} className="column__task">
    <Grid container item className="task__description-conteiner" xl={10} xs={10}>
      <Typography className="task__description" variant="body1">
        First task
      </Typography>
    </Grid>
    <Grid className="task__btn-conteiner" item xl={1.8} xs={1.8}>
      <Button
        className="task__delete-btn"
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
      ></Button>
    </Grid>
  </Paper>
  )
}

export default Task;