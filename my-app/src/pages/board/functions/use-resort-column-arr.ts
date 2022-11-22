import { useDispatch } from 'react-redux';
import { getColumnsInBoard, updateSetOfColumns } from 'store/columns/columns-thunks';
import store from 'store/store';
import sortArr from './sort-arr';

async function useResortColumnArr(columnArrToResort: IColumnResponse[], boardId: string): Promise<void> {
  const dispatch = useDispatch<typeof store.dispatch>();
  const resortedColumnArr = sortArr(columnArrToResort);
  if (resortedColumnArr) {
    const newColumnsOrder: IColumnRequest[] = [];
    resortedColumnArr.forEach((column, index) => {
      const newColumnOrder = { _id: column._id, order: index };
      newColumnsOrder.push(newColumnOrder);
    });

    let isChanged = false;
    newColumnsOrder.forEach((column, index) => {
      if (column._id !== columnArrToResort[index]._id || column.order !== columnArrToResort[index].order) {
        isChanged = true;
        return;
      }
    });

    if (isChanged) {
      await dispatch(updateSetOfColumns(newColumnsOrder));
    }
  }
}

export default useResortColumnArr;
