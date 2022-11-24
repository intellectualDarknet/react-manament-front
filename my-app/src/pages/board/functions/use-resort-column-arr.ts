import { useDispatch } from 'react-redux';
import { updateSetOfColumns } from 'store/columns/columns-thunks';
import store from 'store/store';
import sortArr from './sort-arr';

async function useResortColumnArr(columnArrToResort: IColumnResponse[], newOrder?: number[]): Promise<void> {
  const dispatch = useDispatch<typeof store.dispatch>();
  const resortedColumnArr = sortArr(columnArrToResort);
  if (resortedColumnArr) {
    const newColumnsOrder: IColumnRequest[] = [];
    resortedColumnArr.forEach((column, index) => {
      let newColumnOrder: { _id: string, order: number }
      if (newOrder) {
        newColumnOrder = { _id: column._id, order: newOrder[index] };
      } else {
        newColumnOrder = { _id: column._id, order: index };
      }
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
