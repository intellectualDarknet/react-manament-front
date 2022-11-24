import { logout } from 'store/auth/auth-slice';
import { hideMessage, showMessage } from 'store/snackbar/snackbar-slice';
import { StoreType } from 'store/store';
import api from './api';

export const authInterceptor = (store: StoreType) => {
  api.interceptors.request.use(
    (conf) => {
      store.dispatch(hideMessage());
      if (store.getState().rootReducer.authReducer.token) {
        conf.headers['Authorization'] = `Bearer ${store.getState().rootReducer.authReducer.token}`;
      }
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (next) => {
      store.dispatch(showMessage({ open: true, message: next.statusText, severity: 'success' }));
      return Promise.resolve(next);
    },
    (error) => {
      store.dispatch(showMessage({ open: true, message: error.message, severity: 'error' }));
      setTimeout(() => {
        store.dispatch(hideMessage());
      }, 5000);
      if (error.response.status === 401 || error.response.status === 403) {
        store.dispatch(logout());
        localStorage.clear();
      }
      return Promise.reject(error);
    }
  );
};
