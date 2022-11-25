import { Dispatch, SetStateAction } from 'react';
import { ITaskState } from '../board';
import useChangeTaskOrder from './use-change-task-order';

async function useMoveTask(
  boardId: string,
  dragTaskState: ITaskState,
  dropTaskState: ITaskState,
  setDragTask: Dispatch<SetStateAction<ITaskState>>,
  setDropTask: Dispatch<SetStateAction<ITaskState>>,
  currentBoardTasks: ITask[]
): Promise<void> {
  let dragTask: ITask;
  let dropTask: ITask;
  if (dragTaskState && dropTaskState && setDragTask && setDropTask && currentBoardTasks) {
    dragTask = currentBoardTasks.find((task) => task._id === dragTaskState.taskId);
    dropTask = currentBoardTasks.find((task) => task._id === dropTaskState.taskId);
  }
  await useChangeTaskOrder(boardId, dragTask, dropTask, setDragTask, setDropTask);
}

export default useMoveTask;
