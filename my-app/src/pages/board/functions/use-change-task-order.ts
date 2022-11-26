import { useDispatch } from 'react-redux';
import { getTasksByBoardId, updateTaskById } from 'store/tasks/tasks-thunk';
import { Dispatch, SetStateAction } from 'react';
import { DragItemType, IDragItemState, ITaskState } from '../board';
import store from 'store/store';

async function useChangeTaskOrder(
  board: IBoardResponse,
  dragTask: ITask | undefined,
  dropTask: ITask | undefined,
  setDragItem: Dispatch<SetStateAction<IDragItemState>>,
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
      console.log('changeTaskOrderRequest', changeTaskOrderRequest);
      await dispatch(updateTaskById(changeTaskOrderRequest));
      setDragItem({ type: DragItemType.NONE, columnId: '', taskId: '', order: '' });
      setDropTask({ columnId: '', taskId: '', taskOrder: '' });
      await dispatch(getTasksByBoardId(board._id));
    }
  }
}

export default useChangeTaskOrder;
