import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth-slice';
import BoardsReducer from './boards/boards-slice';
import ColumnsReducer from './columns/columns-slice';
import PointsReducer from './points/points-slice';

export const rootReducer = combineReducers({
  authReducer,
  BoardsReducer,
  ColumnsReducer,
  PointsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
