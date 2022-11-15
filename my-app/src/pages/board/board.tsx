import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import DeleteIcon from '@mui/icons-material/Delete';

const Board = () => {
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
          Board&apos;s title
        </Typography>
        <Grid container className="board__columns-layout">
          <Grid container item className="board__column" xl={3} xs={3}>
            <Typography variant="h5" className="column__title">
              First column
            </Typography>
            <Grid container className="column__tasks-conteiner">
              <Grid container className="column__task">
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
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
                Create task
              </Button>
            </Grid>
            <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
              Delete column
            </Button>
          </Grid>
          <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
            <Typography variant="h5" className="column__title">
              Second column
            </Typography>
            <Grid container className="column__tasks-conteiner">
              <Grid container className="column__task">
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
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
                Create task
              </Button>
            </Grid>
            <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
              Delete column
            </Button>
          </Grid>
          <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
            <Typography variant="h5" className="column__title">
              More column
            </Typography>
            <Grid container className="column__tasks-conteiner">
              <Grid container className="column__task">
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
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
                Create task
              </Button>
            </Grid>
            <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
              Delete column
            </Button>
          </Grid>
          <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
            <Typography variant="h5" className="column__title">
              More column
            </Typography>
            <Grid container className="column__tasks-conteiner">
              <Grid container className="column__task">
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
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
                Create task
              </Button>
            </Grid>
            <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
              Delete column
            </Button>
          </Grid>
          <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
            <Typography variant="h5" className="column__title">
              More column
            </Typography>
            <Grid container className="column__tasks-conteiner">
              <Grid container className="column__task">
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
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
                Create task
              </Button>
            </Grid>
            <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
              Delete column
            </Button>
          </Grid>
          <Grid container item className="board__column" xl={3} xs={3} justifyContent="space-between">
            <Typography variant="h5" className="column__title">
              More column
            </Typography>
            <Grid container className="column__tasks-conteiner">
              <Grid container className="column__task">
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
              </Grid>
              <Grid container className="column__task">
                <Grid item className="task__description-conteiner" xl={10} xs={10}>
                  <Typography className="task__description" variant="body1">
                    Second task is bigger than first to show it&apos;s move to the next string
                  </Typography>
                </Grid>
                <Grid item className="task__btn-conteiner" xl={1.8} xs={1.8}>
                  <Button
                    className="task__delete-btn"
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                  ></Button>
                </Grid>
              </Grid>
              <Button className="task__create-btn" variant="contained" color="secondary" endIcon={<AddIcon />}>
                Create task
              </Button>
            </Grid>
            <Button className="column__delete-btn" variant="contained" color="error" endIcon={<DeleteIcon />}>
              Delete column
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Board;
