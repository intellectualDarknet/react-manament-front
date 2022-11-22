import { useDispatch } from 'react-redux';
import { updateColumnById } from 'store/columns/columns-thunks';
import store from 'store/store';
import sortArr from './sort-arr';

function useResortColumnArr(columnArrToResort: IColumnResponse[], boardId: string): void {
  const dispatch = useDispatch<typeof store.dispatch>();
  const resortedColumnArr = sortArr(columnArrToResort);
  if (resortedColumnArr) {
    resortedColumnArr.forEach((column, index) => {
      dispatch(
        updateColumnById({
          boardId,
          columnId: column._id,
          title: column.title,
          order: index,
        })
      );
    });
  }
} // TODO: В цикле нужно подготовить массив для обновления всех колонок по методу updateSetColumn
// TODO: Так же нужно произвести обновление только если в порядке действительно произошли изменения (сравнить массивы ордеров)

export default useResortColumnArr;
