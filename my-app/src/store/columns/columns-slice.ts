import { createSlice } from '@reduxjs/toolkit';
import {
  getColumnsInBoard,
  createColumn,
  getColumnById,
  updateColumnById,
  deleteColumn,
  getColumnsByColumnId,
  updateSetOfColumns,
  createSetOfColumns,
} from './columns-thunks';

interface IColumnsState {
  columns: IColumnResponse[];
  columnsLoading: boolean;
  columnsError: IResponseError;

  createColumnLoading: boolean;
  createColumnError: IResponseError;

  getColumnById: IColumnResponse;
  getColumnByIdLoading: boolean;
  getColumnByIdError: IResponseError;

  updateColumnByIdLoading: boolean;
  updateColumnByIdError: IResponseError;

  deleteColumnLoading: boolean;
  deleteColumnError: IResponseError;

  getColumnsByColumnId: IColumnResponse[];
  getColumnsByColumnIdLoading: boolean;
  getColumnsByColumnIdError: IResponseError;

  updateSetOfColumnsLoading: boolean;
  updateSetOfColumnsError: IResponseError;

  createSetOfColumnsLoading: boolean;
  createSetOfColumnsError: IResponseError;
}

const initialState: IColumnsState = {
  columns: void 0,
  columnsLoading: void 0,
  columnsError: void 0,

  createColumnLoading: void 0,
  createColumnError: void 0,

  getColumnById: void 0,
  getColumnByIdLoading: void 0,
  getColumnByIdError: void 0,

  updateColumnByIdLoading: void 0,
  updateColumnByIdError: void 0,

  deleteColumnLoading: void 0,
  deleteColumnError: void 0,

  getColumnsByColumnId: void 0,
  getColumnsByColumnIdLoading: void 0,
  getColumnsByColumnIdError: void 0,

  updateSetOfColumnsLoading: void 0,
  updateSetOfColumnsError: void 0,

  createSetOfColumnsLoading: void 0,
  createSetOfColumnsError: void 0,
};

export const columnsSlice = createSlice({
  initialState: initialState,
  name: 'columns',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColumnsInBoard.pending, (state) => {
        state.columnsLoading = true;
        state.columns = initialState.columns;
        state.columnsError = initialState.columnsError;
      })
      .addCase(getColumnsInBoard.fulfilled, (state, action) => {
        state.columnsLoading = false;
        state.columns = action.payload;
      })
      .addCase(getColumnsInBoard.rejected, (state, action) => {
        state.columnsLoading = false;
        state.columnsError = action.error as IResponseError;
      })
      .addCase(createColumn.pending, (state) => {
        state.createColumnLoading = true;
        state.createColumnError = initialState.createColumnError;
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.createColumnLoading = false;
        state.columns.push(action.payload);
      })
      .addCase(createColumn.rejected, (state, action) => {
        state.createColumnLoading = false;
        state.createColumnError = action.error as IResponseError;
      })

      .addCase(getColumnById.pending, (state) => {
        state.getColumnByIdLoading = true;
        state.getColumnByIdError = initialState.getColumnByIdError;
      })
      .addCase(getColumnById.fulfilled, (state, action) => {
        state.getColumnByIdLoading = false;
        state.getColumnById = action.payload;
      })
      .addCase(getColumnById.rejected, (state, action) => {
        state.getColumnByIdLoading = false;
        state.getColumnByIdError = action.error as IResponseError;
      })

      .addCase(updateColumnById.pending, (state) => {
        state.updateColumnByIdLoading = true;
        state.updateColumnByIdError = initialState.updateColumnByIdError;
      })
      .addCase(updateColumnById.fulfilled, (state, action) => {
        state.updateColumnByIdLoading = false;
        // may be changed
        state.columns[state.columns.indexOf(state.columns.find((elem) => elem._id == action.payload._id))] =
          action.payload;
      })
      .addCase(updateColumnById.rejected, (state, action) => {
        state.updateColumnByIdLoading = false;
        state.updateColumnByIdError = action.error as IResponseError;
      })

      .addCase(deleteColumn.pending, (state) => {
        state.deleteColumnLoading = true;
        state.deleteColumnError = initialState.deleteColumnError;
      })
      .addCase(deleteColumn.fulfilled, (state, action) => {
        state.deleteColumnLoading = false;
        state.columns = state.columns.filter((elem) => elem._id != action.payload._id);
      })
      .addCase(deleteColumn.rejected, (state, action) => {
        state.deleteColumnLoading = false;
        state.deleteColumnError = action.error as IResponseError;
      })

      .addCase(getColumnsByColumnId.pending, (state) => {
        state.getColumnsByColumnIdLoading = true;
        state.getColumnsByColumnIdError = initialState.getColumnsByColumnIdError;
      })
      .addCase(getColumnsByColumnId.fulfilled, (state, action) => {
        state.getColumnsByColumnIdLoading = false;
        // TODO this equation can be changed according to logic
        state.getColumnsByColumnId = action.payload;
      })
      .addCase(getColumnsByColumnId.rejected, (state, action) => {
        state.getColumnsByColumnIdLoading = false;
        state.getColumnsByColumnIdError = action.error as IResponseError;
      })

      .addCase(updateSetOfColumns.pending, (state) => {
        state.updateSetOfColumnsLoading = true;
        state.updateSetOfColumnsError = initialState.updateSetOfColumnsError;
      })
      .addCase(updateSetOfColumns.fulfilled, (state, action) => {
        state.updateSetOfColumnsLoading = false;
        // TODO this equation can be changed according to logic
        state.getColumnsByColumnId = action.payload;
      })
      .addCase(updateSetOfColumns.rejected, (state, action) => {
        state.updateSetOfColumnsLoading = false;
        state.updateSetOfColumnsError = action.error as IResponseError;
      })

      .addCase(createSetOfColumns.pending, (state) => {
        state.createSetOfColumnsLoading = true;
        state.createSetOfColumnsError = initialState.createSetOfColumnsError;
      })
      .addCase(createSetOfColumns.fulfilled, (state, action) => {
        state.createSetOfColumnsLoading = false;
        // TODO this equation can be changed according to logic
        state.getColumnsByColumnId = action.payload;
      })
      .addCase(createSetOfColumns.rejected, (state, action) => {
        state.createSetOfColumnsLoading = false;
        state.createSetOfColumnsError = action.error as IResponseError;
      });
  },
});

export default columnsSlice.reducer;

// export const { logout } = authSlice.actions;
