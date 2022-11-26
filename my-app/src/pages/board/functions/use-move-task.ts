import { Dispatch, SetStateAction } from 'react';
import { DragItemType, IDragItemState, ITaskState } from '../board';
import useChangeTaskOrder from './use-change-task-order';

async function useMoveTask(
  board: IBoardResponse,
  dragItem: IDragItemState,
  dropTaskState: ITaskState,
  setDragItem: Dispatch<SetStateAction<IDragItemState>>,
  setDropTask: Dispatch<SetStateAction<ITaskState>>,
  currentBoardTasks: ITask[]
): Promise<void> {
  console.log('Все такси доски: ', currentBoardTasks);
  let dragTask: ITask;
  let dropTask: ITask;
  if (dragItem.type === DragItemType.TASK && dropTaskState.taskId && currentBoardTasks) {
    dragTask = currentBoardTasks.find((task) => task._id === dragItem.taskId);
    dropTask = currentBoardTasks.find((task) => task._id === dropTaskState.taskId);
    console.log('D&d tasks: ', dragTask, dropTask);
    console.log('D&d state: ', dragItem, dropTaskState);
  }
  await useChangeTaskOrder(board, dragTask, dropTask, setDragItem, setDropTask);
}

export default useMoveTask;
