import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export const GetColumnsInBoard = createAsyncThunk<IBoardResponse[], void>(
  'boards',
  async function (BoardId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`${BoardId}/columns`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const GetColumnsInBoard = createAsyncThunk<IBoardResponse[], void>(
  'boards',
  async function (BoardId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`${BoardId}/columns`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
