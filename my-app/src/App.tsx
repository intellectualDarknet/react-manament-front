import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Boards from './pages/boards';
import Errorpage from './pages/error/error';
import Start from './pages/start/start';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme';
import './assets/styles/style.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import Board from 'pages/board/board';
import SignUpPage from 'pages/signUpPage/signUpPage';
import SignInPage from 'pages/signInPage/signInPage';
import UserBoards from 'pages/boards/userBoards';
import { RootState, useAppSelector } from 'store/store';
import User from 'pages/userPage';
import SnackBar from 'components/snackbar/snackbar';

function App(): JSX.Element {
  const userId: string = useAppSelector((state: RootState) => state.rootReducer.authReducer.userId);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header />
          <SnackBar />

          <main>
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="sign-up" element={!userId ? <SignUpPage /> : <Navigate to="/boards" replace />} />
              <Route path="sign-in" element={!userId ? <SignInPage /> : <Navigate to="/boards" replace />} />
              <Route path="boards" element={userId ? <Boards /> : <Navigate to="/" replace />} />
              <Route path="board" element={userId ? <Board /> : <Navigate to="/" replace />} />
              <Route path="user-page" element={userId ? <User /> : <Navigate to="/" replace />} />
              <Route path="user-boards" element={userId ? <UserBoards /> : <Navigate to="/" replace />} />
              <Route path="404" element={<Errorpage />} />
              <Route path="*" element={<Navigate to="404" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
