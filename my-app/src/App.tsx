import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Authorization from './pages/authorization/authorization';
import Boards from './pages/boards/boards';
import Errorpage from './pages/error/error';
import Start from './pages/start/start';

function App() {
  // const { LL } = useI18nContext();

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="Start" element={<Start />} />
          <Route path="Authorization" element={<Authorization />} />
          <Route path="Boards" element={<Boards />} />
          <Route path="404" element={<Errorpage />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
