import { useDispatch } from 'react-redux';
import { getTasksByBoardId, updateTaskById } from 'store/tasks/tasks-thunk';
import { Dispatch, SetStateAction } from 'react';
import { ITaskState } from '../board';
import store from 'store/store';
import useResortTasksArr from './use-resort-tasks-arr';
import { getColumnsInBoard } from 'store/columns/columns-thunks';

async function useChangeTaskOrder(
  board: IBoardResponse,
  columns: IColumnResponse[],
  currentBoardTasks: ITask[],
  dragTask: ITask | undefined,
  dropTask: ITask | undefined,
  setDragTask: Dispatch<SetStateAction<ITaskState>>,
  setDropTask: Dispatch<SetStateAction<ITaskState>>
): Promise<void> {
  const dispatch = useDispatch<typeof store.dispatch>();
  if (dragTask && dropTask) {
    if (dragTask._id !== dropTask._id) {
      const changeTaskOrderRequest = {
        title: dragTask.title,
        order: dropTask.order + 0.5,
        description: dragTask.description,
        columnId: dropTask.columnId,
        boardId: dragTask.boardId,
        taskId: dragTask._id,
        userId: 0, // Здесь ошибка в типе на бэкенде
        users: dragTask.users,
      };
      await dispatch(updateTaskById(changeTaskOrderRequest));
      setDragTask({ columnId: '', taskId: '', taskOrder: '' });
      setDropTask({ columnId: '', taskId: '', taskOrder: '' });
      await dispatch(getTasksByBoardId(board._id));
    }
  }
}

export default useChangeTaskOrder;
