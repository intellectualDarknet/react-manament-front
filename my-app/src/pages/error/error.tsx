import React, { useEffect } from 'react';
import './error.scss';
import { useTranslation, Trans } from 'react-i18next';
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

const lngs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russia' },
};

const ErrorPage = () => {
  const { t, i18n } = useTranslation();
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
      {Object.keys(lngs).map((lng) => (
        <button
          type="submit"
          key={lng}
          onClick={() => i18n.changeLanguage(lng)}
          disabled={i18n.resolvedLanguage === lng}
        >
          {lngs[lng as keyof typeof lngs].nativeName}
        </button>
      ))}
      <p>
        <Trans i18nKey="description"></Trans>
      </p>
      {t('learn')}
      <div className="error">
        <div className="error__descr">The page was not found</div>
      </div>
    </>
  );
};

export default ErrorPage;
