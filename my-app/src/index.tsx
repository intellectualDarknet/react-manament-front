import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { authInterceptor } from 'api/auth-interceptor';
import App from './App';
import store from './store/store';
import './i18n';
import './index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
authInterceptor(store);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
