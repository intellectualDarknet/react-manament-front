import sortTasks from './sort-tasks';
import sortArr from './sort-arr';
import store from 'store/store';
import { useDispatch } from 'react-redux';
import { getTasksByBoardId, updateSetOfTasks } from 'store/tasks/tasks-thunk';

async function useResortTasksArr(board: IBoardResponse, columns: IColumnResponse[], tasks: ITask[]): Promise<void> {
  const dispatch = useDispatch<typeof store.dispatch>();
  const sortedTasks = sortTasks(columns, tasks);
  const newOrder: IUpdateSetTasksRequest[] = [];
  let orderHasChanged = false;
  columns.forEach((column) => {
    const tasksOfCurrentColumn = sortedTasks.get(column._id);
    const sortedTasksOfCurrentColumn = sortArr(tasksOfCurrentColumn);
    console.log('Сортируем таски, согласно порядку order: ', sortedTasksOfCurrentColumn);
    sortedTasksOfCurrentColumn.forEach((task, index) => {
      if (task.order !== index) {
        orderHasChanged = true;
        console.log('Task order! ', task.order);
        console.log('Index! ', index);
      }
      newOrder.push({
        _id: task._id,
        order: index,
        columnId: column._id,
      });
    });
  });
  if (newOrder && orderHasChanged) {
    console.log('Tasks was sorted!');
    await dispatch(updateSetOfTasks(newOrder));
    await dispatch(getTasksByBoardId(board._id));
  }
}

export default useResortTasksArr;
