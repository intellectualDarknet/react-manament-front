import { logout } from 'store/auth/auth-slice';
import { StoreType } from 'store/store';
import api from './api';

export const authInterceptor = (store: StoreType) => {
  api.interceptors.request.use(
    (conf) => {
      console.log('interseptor works!');
      // you can add some information before send it.
      conf.headers['Authorization'] = `Bearer ${store.getState().rootReducer.authReducer.token}`;
      return conf;
    },
    (error) => {
      console.log('interseptor error');
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      // TODO: add 401 error handle
      store.dispatch(logout());
      return Promise.reject(error);
    }
  );
};
