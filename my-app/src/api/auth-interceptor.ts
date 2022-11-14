import { logout } from 'store/auth/auth-slice';
import { StoreType } from 'store/store';
import api from './api';

export const authInterceptor = (store: StoreType) => {
  api.interceptors.request.use(
    (conf) => {
      // you can add some information before send it.
      conf.headers['Authorization'] = `Bearer ${store.getState().authReducer.token}`;
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
      store.dispatch(logout());
      return Promise.reject(error);
    }
  );
};
