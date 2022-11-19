import { Grid, Typography, Button } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Task from './task';
import { ICreateTaskData } from '../boards-types';
import { Dispatch, SetStateAction } from 'react';

function Column(props: {
  userId: string;
  board: IBoardResponse;
  column: IColumnResponse;
  tasks: ITask[];
  key: number;
  deleteColumnByButtonPress: (columnId: string) => void;
  deleteTaskByButtonPress: (data: IGetTasksRequest) => void;
  toggleForm: () => void;
  setTaskIsChosen: Dispatch<SetStateAction<boolean>>;
  setClickedColumnId: Dispatch<SetStateAction<string>>;
}): JSX.Element {
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

  const deleteThisColumn = (): void => {
    props.deleteColumnByButtonPress(props.column._id);
  };

  const handleAddTask = (): void => {
    props.setTaskIsChosen((): boolean => true);
    props.setClickedColumnId((): string => props.column._id);
    props.toggleForm();
  };

  return (
    <Grid container item className="board__column" xl={3} xs={3} key={props.key}>
      <Typography variant="h5" className="column__title">
        {props.column.title}
      </Typography>
      <Grid container className="column__tasks-conteiner">
        {filteredTasks.map((elem, index) =>
          Task({
            board: props.board,
            column: props.column,
            task: elem,
            key: index,
            deleteTaskByButtonPress: props.deleteTaskByButtonPress,
          })
        )}
        <Button
          className="task__create-btn"
          onClick={handleAddTask}
          variant="contained"
          color="secondary"
          endIcon={<AddIcon />}
        >
          Add task
        </Button>
      </Grid>
      <Button
        className="column__delete-btn"
        onClick={deleteThisColumn}
        variant="outlined"
        color="error"
        endIcon={<DeleteIcon />}
      >
        Delete column
      </Button>
    </Grid>
  );
}

export default Column;
