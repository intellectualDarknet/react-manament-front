import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth-slice';
import boardsReducer from './boards/boards-slice';
import pointsReducer from './points/points-slice';
import tasksReducer from './tasks/tasks-slice';
import columnsReducer from './columns/columns-slice';
import { AppStore } from './storeRe';

export const rootReducer = combineReducers({
  authReducer,
  boardsReducer,
  pointsReducer,
  tasksReducer,
  columnsReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type StoreType = typeof store;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = AppStore['dispatch'];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
