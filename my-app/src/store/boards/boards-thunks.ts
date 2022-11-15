import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export const getBoards = createAsyncThunk<IGetBoardResponse[], void>(
  'boards',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.get('boards');
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const createBoard = createAsyncThunk<IGetBoardResponse, ICreateBoardRequest>(
  'boards',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.post('boards', request);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getBoardById = createAsyncThunk<IGetBoardResponse, string>(
  'boards',
  async function (boardId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`boards/${boardId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateBoardById = createAsyncThunk<IGetBoardResponse, IUpdateBoardByIdRequest>(
  'boards',
  async function ({ boardId, ...rest }, { rejectWithValue }) {
    try {
      const data: Response = await api.put(`boards/${boardId}`, rest);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const deleteBoardById = createAsyncThunk<IGetBoardResponse, string>(
  'boards',
  async function (boardId, { rejectWithValue }) {
    try {
      const data: Response = await api.delete(`boards/${boardId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

// TODO GetBoardsById

export const getBoardsByUserId = createAsyncThunk<IGetBoardResponse, string>(
  'boards',
  async function (userId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`boards/${userId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
