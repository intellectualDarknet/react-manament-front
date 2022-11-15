import { logout } from 'store/auth/auth-slice';
import { StoreType } from 'store/store';
import api from './api';

export const authInterceptor = (store: StoreType) => {
  api.interceptors.request.use(
    (conf) => {
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
      return Promise.resolve(next);
    },
    (error) => {
      if (error.status === 401) {
        store.dispatch(logout());
      }
      return Promise.reject(error);
    }
  );
};
