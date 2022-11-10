import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-translated';
import translation from './translation';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider language="en" translation={translation}>
      <App />
    </Provider>
  </React.StrictMode>
);
