import { createSlice } from '@reduxjs/toolkit';
import {
  getBoards,
  createBoard,
  getBoardById,
  updateBoardById,
  deleteBoardById,
  getBoardsByIds,
  getBoardsByUserId,
} from './boards-thunks';

interface IBoardsState {
  boards: IGetBoardResponse[];
  boardsLoading: boolean;
  boardsError: IResponseError;

  createBoardLoading: boolean;
  createBoardError: IResponseError;

  updateBoardLoading: boolean;
  updateBoardError: IResponseError;

  deleteBoardLoading: boolean;
  deleteBoardError: IResponseError;

  boardById: IGetBoardResponse;
  boardByIdLoading: boolean;
  boardByIdError: IResponseError;

  boardsByIds: IGetBoardResponse[];
  boardsByIdsLoading: boolean;
  boardsByIdsError: IResponseError;

  userBoard: IGetBoardResponse;
  userBoardLoading: boolean;
  userBoardError: IResponseError;
}

const initialState: IBoardsState = {
  boards: void 0,
  boardsLoading: void 0,
  boardsError: void 0,

  createBoardLoading: void 0,
  createBoardError: void 0,

  updateBoardLoading: void 0,
  updateBoardError: void 0,

  deleteBoardLoading: void 0,
  deleteBoardError: void 0,

  boardById: void 0,
  boardByIdLoading: void 0,
  boardByIdError: void 0,

  boardsByIds: void 0,
  boardsByIdsLoading: void 0,
  boardsByIdsError: void 0,

  userBoard: void 0,
  userBoardLoading: void 0,
  userBoardError: void 0,
};

export const boardsSlice = createSlice({
  initialState: initialState,
  name: 'boards',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.pending, (state) => {
        state.boardsLoading = true;
        state.boards = initialState.boards;
        state.boardsError = initialState.boardsError;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.boardsLoading = false;
        state.boards = action.payload;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.boardsLoading = false;
        state.boardsError = action.error as IResponseError;
      })

      .addCase(createBoard.pending, (state) => {
        state.createBoardLoading = true;
        state.createBoardError = initialState.createBoardError;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.createBoardLoading = false;
        state.boards.push(action.payload);
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.createBoardLoading = false;
        state.createBoardError = action.error as IResponseError;
      })

      .addCase(updateBoardById.pending, (state) => {
        state.updateBoardLoading = true;
        state.updateBoardError = initialState.updateBoardError;
      })
      .addCase(updateBoardById.fulfilled, (state, action) => {
        state.updateBoardLoading = false;
        state.boards[state.boards.indexOf(state.boards.find((elem) => elem._id == action.payload._id))] =
          action.payload;
      })
      .addCase(updateBoardById.rejected, (state, action) => {
        state.updateBoardLoading = false;
        state.updateBoardError = action.error as IResponseError;
      })

      .addCase(deleteBoardById.pending, (state) => {
        state.deleteBoardLoading = true;
        state.deleteBoardError = initialState.updateBoardError;
      })
      .addCase(deleteBoardById.fulfilled, (state, action) => {
        state.deleteBoardLoading = false;
        state.boards = state.boards.filter((elem) => elem._id != action.payload._id);
      })
      .addCase(deleteBoardById.rejected, (state, action) => {
        state.deleteBoardLoading = false;
        state.deleteBoardError = action.error as IResponseError;
      })

      .addCase(getBoardById.pending, (state) => {
        state.boardByIdLoading = true;
        state.boardByIdError = initialState.updateBoardError;
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.boardByIdLoading = false;
        // TODO this equation can be changed according to logic
        state.boardById = action.payload;
      })
      .addCase(getBoardById.rejected, (state, action) => {
        state.boardByIdLoading = false;
        state.boardByIdError = action.error as IResponseError;
      })

      .addCase(getBoardsByIds.pending, (state) => {
        state.boardsByIdsLoading = true;
        state.boardsByIdsError = initialState.updateBoardError;
      })
      .addCase(getBoardsByIds.fulfilled, (state, action) => {
        state.boardsByIdsLoading = false;
        // TODO this equation can be changed according to logic
        state.boardsByIds = action.payload;
      })
      .addCase(getBoardsByIds.rejected, (state, action) => {
        state.boardsByIdsLoading = false;
        state.boardsByIdsError = action.error as IResponseError;
      })

      .addCase(getBoardsByUserId.pending, (state) => {
        state.userBoardLoading = true;
        state.userBoardError = initialState.updateBoardError;
      })
      .addCase(getBoardsByUserId.fulfilled, (state, action) => {
        state.userBoardLoading = false;
        // TODO this equation can be changed according to logic
        state.userBoard = action.payload;
      })
      .addCase(getBoardsByUserId.rejected, (state, action) => {
        state.userBoardLoading = false;
        state.userBoardError = action.error as IResponseError;
      });
  },
});

export default boardsSlice.reducer;

// export const { logout } = authSlice.actions;
