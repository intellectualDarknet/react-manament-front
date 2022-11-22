import React, { useEffect } from 'react';
import './error.scss';
import { useTranslation } from 'react-i18next';
import { signIn, signUp } from 'store/auth/auth-thunks';
import { AppDispatch, RootState, useAppDispatch, useAppSelector } from 'store/store';
import {
  getBoards,
  createBoard,
  updateBoardById,
  deleteBoardById,
  getBoardById,
  getBoardsByUserId,
} from '../../store/boards/boards-thunks';
import {
  createColumn,
  createSetOfColumns,
  deleteColumn,
  getColumnById,
  getColumnsByColumnId,
  getColumnsInBoard,
  updateColumnById,
  updateSetOfColumns,
} from 'store/columns/columns-thunks';

const ErrorPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auths: any = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  const boards: unknown = useAppSelector((state: RootState) => state.rootReducer.boardsReducer);
  const columns: unknown = useAppSelector((state: RootState) => state.rootReducer.columnsReducer);
  const points: unknown = useAppSelector((state: RootState) => state.rootReducer.pointsReducer);
  const tasks: unknown = useAppSelector((state: RootState) => state.rootReducer.tasksReducer);

  // TODO: remove example
  // useEffect(() => {
  //   dispatch(
  //     createSetOfColumns([
  //       { boardId: '6373bf5c0f3c2d3f5e561f61', title: 'res', order: 77 },
  //       { boardId: '6373bf5c0f3c2d3f5e561f61', title: 'resss', order: 144 },
  //     ])
  //   );
  //   dispatch(
  //     updateSetOfColumns([
  //       { _id: '6373bf5c0f3c2d3f5e561f61', order: 1 },
  //       { _id: '6373bf5c0f3c2d3f5e561f61', order: 2 },
  //     ])
  //   );
  // }, [dispatch]);

  return (
    <>
      <div className="error">
        <div className="error__descr">{t('notFound')}</div>
      </div>
    </>
  );
};

export default ErrorPage;
