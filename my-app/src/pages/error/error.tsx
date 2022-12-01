import './error.scss';
import { useTranslation } from 'react-i18next';
// import { RootState, useAppSelector } from 'store/store';

const ErrorPage = () => {
  const { t } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const auths: any = useAppSelector((state: RootState) => state.rootReducer.authReducer);
  // const boards: unknown = useAppSelector((state: RootState) => state.rootReducer.boardsReducer);
  // const columns: unknown = useAppSelector((state: RootState) => state.rootReducer.columnsReducer);
  // const points: unknown = useAppSelector((state: RootState) => state.rootReducer.pointsReducer);
  // const tasks: unknown = useAppSelector((state: RootState) => state.rootReducer.tasksReducer);

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
