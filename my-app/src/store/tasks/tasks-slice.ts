import { createSlice } from '@reduxjs/toolkit';
import {
  getTasksInColumn,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTask,
  getUsersTasksBySearch,
  updateSetOfTasks,
  getTasksByBoardId,
} from './tasks-thunk';

interface ITasksState {
  tasksInColumns: ITask[];
  tasksInColumnsLoading: boolean;
  tasksInColumnsError: IResponseError;

  createTaskLoading: boolean;
  createTaskError: IResponseError;

  getTaskById: ITask;
  getTaskByIdLoading: boolean;
  getTaskByIdError: IResponseError;

  updateTasksByIdLoading: boolean;
  updateTasksByIdError: IResponseError;

  deleteTasksLoading: boolean;
  deleteTasksError: IResponseError;

  getTasksByIds: ITask[];
  getTasksByIdsLoading: boolean;
  getTasksByIdsError: IResponseError;

  updateTasksByIdsLoading: boolean;
  updateTasksByIdsError: IResponseError;

  getTasksByBoardId: ITask[];
  getTasksByBoardIdLoading: boolean;
  getTasksByBoardIdError: IResponseError;
}

const initialState: ITasksState = {
  tasksInColumns: void 0,
  tasksInColumnsLoading: void 0,
  tasksInColumnsError: void 0,

  createTaskLoading: void 0,
  createTaskError: void 0,

  getTaskById: void 0,
  getTaskByIdLoading: void 0,
  getTaskByIdError: void 0,

  updateTasksByIdLoading: void 0,
  updateTasksByIdError: void 0,

  deleteTasksLoading: void 0,
  deleteTasksError: void 0,

  getTasksByIds: void 0,
  getTasksByIdsLoading: void 0,
  getTasksByIdsError: void 0,

  updateTasksByIdsLoading: void 0,
  updateTasksByIdsError: void 0,

  getTasksByBoardId: void 0,
  getTasksByBoardIdLoading: void 0,
  getTasksByBoardIdError: void 0,
};

export const tasksSlice = createSlice({
  initialState: initialState,
  name: 'tasks',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksInColumn.pending, (state) => {
        state.tasksInColumnsLoading = true;
        state.tasksInColumns = initialState.tasksInColumns;
        state.tasksInColumnsError = initialState.tasksInColumnsError;
      })
      .addCase(getTasksInColumn.fulfilled, (state, action) => {
        state.tasksInColumnsLoading = false;
        state.tasksInColumns = action.payload;
      })
      .addCase(getTasksInColumn.rejected, (state, action) => {
        state.tasksInColumnsLoading = false;
        state.tasksInColumnsError = action.error as IResponseError;
      })

      .addCase(createTask.pending, (state) => {
        state.createTaskLoading = true;
        state.createTaskError = initialState.createTaskError;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.createTaskLoading = false;
        state.tasksInColumns.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.createTaskLoading = false;
        state.createTaskError = action.error as IResponseError;
      })

      .addCase(getTaskById.pending, (state) => {
        state.getTaskByIdLoading = true;
        state.getTaskById = initialState.getTaskById;
        state.getTaskByIdError = initialState.getTaskByIdError;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.getTaskByIdLoading = false;
        state.getTaskById = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.getTaskByIdLoading = false;
        state.getTaskByIdError = action.error as IResponseError;
      })

      .addCase(updateTaskById.pending, (state) => {
        state.updateTasksByIdLoading = true;
        state.updateTasksByIdError = initialState.updateTasksByIdError;
      })
      .addCase(updateTaskById.fulfilled, (state, action) => {
        state.updateTasksByIdLoading = false;
        const index = state.tasksInColumns.indexOf(state.tasksInColumns.find((elem) => elem._id == action.payload._id));
        state.tasksInColumns[index] = { ...state.tasksInColumns[index], ...action.payload };
      })
      .addCase(updateTaskById.rejected, (state, action) => {
        state.updateTasksByIdLoading = false;
        state.updateTasksByIdError = action.error as IResponseError;
      })

      .addCase(deleteTask.pending, (state) => {
        state.deleteTasksLoading = true;
        state.deleteTasksError = initialState.deleteTasksError;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.deleteTasksLoading = false;
        state.tasksInColumns = state.tasksInColumns.filter((elem) => elem._id != action.payload._id);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.deleteTasksLoading = false;
        state.deleteTasksError = action.error as IResponseError;
      })

      .addCase(getUsersTasksBySearch.pending, (state) => {
        state.getTasksByIdsLoading = true;
        state.getTasksByIdsError = initialState.getTasksByIdsError;
      })
      .addCase(getUsersTasksBySearch.fulfilled, (state, action) => {
        state.getTasksByIdsLoading = false;
        state.getTasksByIds = action.payload;
      })
      .addCase(getUsersTasksBySearch.rejected, (state, action) => {
        state.getTasksByIdsLoading = false;
        state.getTasksByIdsError = action.error as IResponseError;
      })

      .addCase(updateSetOfTasks.pending, (state) => {
        state.updateTasksByIdsLoading = true;
        state.updateTasksByIdsError = initialState.updateTasksByIdsError;
      })
      .addCase(updateSetOfTasks.fulfilled, (state, action) => {
        state.updateTasksByIdsLoading = false;
        state.getTasksByIds = action.payload;
      })
      .addCase(updateSetOfTasks.rejected, (state, action) => {
        state.updateTasksByIdsLoading = false;
        state.updateTasksByIdsError = action.error as IResponseError;
      })

      .addCase(getTasksByBoardId.pending, (state) => {
        state.getTasksByBoardIdLoading = true;
        state.getTasksByBoardId = initialState.getTasksByBoardId;
        state.getTasksByBoardIdError = initialState.getTasksByBoardIdError;
      })
      .addCase(getTasksByBoardId.fulfilled, (state, action) => {
        state.getTasksByBoardIdLoading = false;
        state.getTasksByBoardId = action.payload;
      })
      .addCase(getTasksByBoardId.rejected, (state, action) => {
        state.getTasksByBoardIdLoading = false;
        state.getTasksByBoardIdError = action.error as IResponseError;
      });
  },
});

export default tasksSlice.reducer;
