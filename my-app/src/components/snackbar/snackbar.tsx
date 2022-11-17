import { Alert, Snackbar } from '@mui/material';
import { hideMessage, ISnackBarState } from 'store/snackbar/snackbar-slice';
import { useAppSelector, RootState, useAppDispatch } from 'store/store';
import './snackbar.scss';

const SnackBar = () => {
  const snack: ISnackBarState = useAppSelector((state: RootState) => state.rootReducer.snackBarReducer);
  const dispatch = useAppDispatch();
  return (
    <>
      <Snackbar
        open={snack.open}
        autoHideDuration={5000}
        onClose={() => {
          dispatch(hideMessage());
        }}
      >
        <Alert severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SnackBar;
