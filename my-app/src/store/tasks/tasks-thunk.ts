import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export const getTasksInColumn = createAsyncThunk<ITask[], IGetTasks>(
  'getTasksInColumn',
  async function ({ boardId, columnId }, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`${boardId}/columns/${columnId}/tasks`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const createTask = createAsyncThunk<ITask, ICreateTaskRequest>(
  'createTask',
  async function ({ boardId, columnId, ...rest }, { rejectWithValue }) {
    try {
      const data: Response = await api.post(`${boardId}/columns/${columnId}/tasks`, rest);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getTaskById = createAsyncThunk<ITask, IGetTasksRequest>(
  'getTaskById',
  async function ({ boardId, columnId, taskId }, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`${boardId}/columns/${columnId}/tasks/${taskId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateTaskById = createAsyncThunk<ITask, IUpdateTaskRequest>(
  'updateTaskById',
  async function ({ boardId, columnId, taskId, ...rest }, { rejectWithValue }) {
    try {
      const data: Response = await api.put(`${boardId}/columns/${columnId}/tasks/${taskId}`, rest);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const deleteTask = createAsyncThunk<ITask, IGetTasksRequest>(
  'deleteTask',
  async function ({ boardId, columnId, taskId }, { rejectWithValue }) {
    try {
      const data: Response = await api.delete(`${boardId}/columns/${columnId}/tasks/${taskId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getUsersTasksBySearch = createAsyncThunk<ITask[], ITasksSetRequest>(
  'getUsersTasksBySearch',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`tasksSet`, { params: request });
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const updateSetOfTasks = createAsyncThunk<ITask[], IUpdateSetOfTasks[]>(
  'updateSetOfTasks',
  async function (array, { rejectWithValue }) {
    try {
      const data: Response = await api.patch(`tasksSet`, array);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const getTasksByBoardId = createAsyncThunk<ITask[], string>(
  'getTasksByBoardId',
  async function (boardId, { rejectWithValue }) {
    try {
      const data: Response = await api.get(`tasksSet/${boardId}`);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
