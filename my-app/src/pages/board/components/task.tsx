import React, { Dispatch, DragEvent, SetStateAction } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import DeleteModal from 'components/deleteModal';
import DeleteTaskButton from './DeleteTaskButton';
import { ITaskState } from '../board';

function Task(props: {
  board: IBoardResponse;
  column: IColumnResponse;
  task: ITask;
  key: number;
  setDragTask: Dispatch<SetStateAction<ITaskState>>;
  setDropTask: Dispatch<SetStateAction<ITaskState>>;
  deleteTaskByButtonPress: (data: IGetTasksRequest) => void;
}): JSX.Element {
  const deleteThisTask = () => {
    props.deleteTaskByButtonPress({ boardId: props.board._id, columnId: props.column._id, taskId: props.task._id });
  };

  const dragStartHandler = (event: DragEvent<HTMLElement>) => {
    event.stopPropagation();
    const dragTask = event.target as HTMLElement;
    props.setDragTask({
      columnId: dragTask.dataset.columnId,
      taskId: dragTask.dataset.taskId,
      taskOrder: dragTask.dataset.taskOrder,
    });
    dragTask.classList.add('column__task_dragged');
  };

  const dragEndHandler = (event: DragEvent<HTMLElement>) => {
    (event.target as HTMLElement).classList.remove('column__task_dragged');
  };

  const dragOverHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropTask = dropPath.find((task) => task.dataset.taskOrder);
    if (!dropTask.classList.contains('column__task_dragged')) {
      dropTask.classList.add('column__task_hovered');
    }
  };

  const dragLeaveHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropTask = dropPath.find((task) => task.dataset.taskOrder);
    if (!dropTask.classList.contains('column__task_dragged')) {
      dropTask.classList.remove('column__task_hovered');
    }
  };

  const dropHandler = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const dropPath = event.nativeEvent.composedPath() as HTMLElement[];
    const dropTask = dropPath.find((task) => task.dataset.taskOrder);
    props.setDropTask({
      columnId: dropTask.dataset.columnId,
      taskId: dropTask.dataset.taskId,
      taskOrder: dropTask.dataset.taskOrder,
    });
    dropTask.classList.remove('column__task_hovered');
  };

  return (
    <Paper
      elevation={2}
      className="column__task"
      key={props.key}
      draggable={true}
      data-column-id={props.column._id}
      data-task-id={props.task._id}
      data-task-order={props.task.order}
      onDragStart={(event: DragEvent<HTMLElement>) => {
        dragStartHandler(event);
      }}
      onDragEnd={(event: DragEvent<HTMLElement>) => {
        dragEndHandler(event);
      }}
      onDragOver={(event: DragEvent<HTMLElement>) => {
        dragOverHandler(event);
      }}
      onDragLeave={(event: DragEvent<HTMLElement>) => {
        dragLeaveHandler(event);
      }}
      onDrop={(event: DragEvent<HTMLElement>) => {
        dropHandler(event);
      }}
    >
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
