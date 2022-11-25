import { Dispatch, SetStateAction } from 'react';
import { ITaskState } from '../board';
import useChangeTaskOrder from './use-change-task-order';

async function useMoveTask(
  board: IBoardResponse,
  columns: IColumnResponse[],
  dragTaskState: ITaskState,
  dropTaskState: ITaskState,
  setDragTask: Dispatch<SetStateAction<ITaskState>>,
  setDropTask: Dispatch<SetStateAction<ITaskState>>,
  currentBoardTasks: ITask[]
): Promise<void> {
  console.log('Все такси доски: ', currentBoardTasks);
  let dragTask: ITask;
  let dropTask: ITask;
  if (dragTaskState.taskId && dropTaskState.taskId && currentBoardTasks) {
    dragTask = currentBoardTasks.find((task) => task._id === dragTaskState.taskId);
    dropTask = currentBoardTasks.find((task) => task._id === dropTaskState.taskId);
    console.log('D&d tasks: ', dragTask, dropTask);
    console.log('D&d state: ', dragTaskState, dropTaskState);
  }
  await useChangeTaskOrder(board, columns, currentBoardTasks, dragTask, dropTask, setDragTask, setDropTask);
}

export default useMoveTask;
