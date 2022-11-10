import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TypesafeI18n from './i18n/i18n-react';

function App() {
  // const { LL } = useI18nContext();

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="Start" element={<Start />} />
          <Route path="Authorization" element={<Authorization />} />
          <Route path="Boards" element={<Boards />} />
          <Route path="404" element={<Error />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
