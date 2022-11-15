import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Authorization from './pages/authorization/authorization';
import Boards from './pages/boards/boards';
import Errorpage from './pages/error/error';
import Start from './pages/start/start';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme';
import './assets/styles/style.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import SignIn from 'pages/signIn/SignIn';
import Board from 'pages/board/board';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="Start" element={<Start />} />
              <Route path="Authorization" element={<Authorization />} />
              <Route path="SignIn" element={<SignIn />} />
              <Route path="Boards" element={<Boards />} />
              <Route path="Board" element={<Board />} />
              <Route path="404" element={<Errorpage />} />
              <Route path="*" element={<Errorpage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
