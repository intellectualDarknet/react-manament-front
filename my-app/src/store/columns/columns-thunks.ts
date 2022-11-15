import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export const getColumnsInBoard = createAsyncThunk<IColumnResponse[], void>(
  'getColumnsInBoard',
  async function (BoardId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`${BoardId}/columns`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const createColumn = createAsyncThunk<IColumnResponse, INewColumn>(
  'createColumn',
  async function ({ boardId, ...rest }, { rejectWithValue }) {
    try {
      const data: Response = await api.post(`${boardId}/columns`, rest);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getColumnById = createAsyncThunk<IColumnResponse, IGetColumn>(
  'getColumnById',
  async function ({ boardId, columnId }, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`${boardId}/columns/${columnId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateColumnById = createAsyncThunk<IColumnResponse, IUpdateColumn>(
  'updateColumnById',
  async function ({ boardId, columnId, ...rest }, { rejectWithValue }) {
    try {
      const data: Response = await api.put(`${boardId}/columns/${columnId}`, rest);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const deleteColumn = createAsyncThunk<IColumnResponse, IDeleteColumn>(
  'deleteColumn',
  async function ({ boardId, columnId }, { rejectWithValue }) {
    try {
      const data: Response = await api.delete(`${boardId}/columns/${columnId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

// check it out
export const getColumnsByColumnId = createAsyncThunk<IColumnResponse[], string>(
  'getColumnsByColumnId',
  async function (userId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`columnsSet`, { params: userId });
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateSetOfColumns = createAsyncThunk<IColumnResponse[], IColumnRequest[]>(
  'updateSetOfColumns',
  async function (array, { rejectWithValue }) {
    try {
      const data: Response = await api.patch(`columnsSet`, array);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
// rewrite
export const createSetOfColumns = createAsyncThunk<IColumnResponse[], IColumnRequest[]>(
  'createSetOfColumns',
  async function (array, { rejectWithValue }) {
    try {
      const data: Response = await api.patch(`columnsSet`, array);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
