import React, { useEffect } from 'react';
import './error.scss';
import { useTranslation, Trans } from 'react-i18next';
import TestComponent from 'components/testcomponent/testcomponent';
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

const lngs = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Russia' },
};

const Errorpage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const auths: any = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  const boards: unknown = useAppSelector((state: RootState) => state.rootReducer.boardsReducer);
  const columns: unknown = useAppSelector((state: RootState) => state.rootReducer.columnsReducer);
  const points: unknown = useAppSelector((state: RootState) => state.rootReducer.pointsReducer);
  const tasks: unknown = useAppSelector((state: RootState) => state.rootReducer.tasksReducer);

  useEffect(() => {
    // dispatch(
    //   signUp({
    //     name: 'lackylu',
    //     login: 'lackylu',
    //     password: '4057321qwe',
    //   })
    // );
    // dispatch(signIn({ login: 'lackylu', password: '4057321qwe' }));
    // localStorage.setItem('token', auths.token);
    // dispatch(createBoard({ _id: 'sdfkz133', title: 'hello2', owner: 'string2', users: ['loserz'] }));
    dispatch(getBoards());
    // dispatch(getBoardById('sdfkz131'));
  }, [dispatch]);

  console.log('boards', boards);
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
      <TestComponent />;
    </>
  );
};

export default Errorpage;
