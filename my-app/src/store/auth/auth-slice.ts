import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from './auth-thunks';

interface IAuthState {
  userId: string;
  token: string;
  name: string;
  login: string;
  signInLoading: boolean;
  signInError: IResponseError;
  signUpLoading: boolean;
  signUpError: IResponseError;
}

const initialState: IAuthState = {
  token: void 0,
  userId: void 0,
  name: void 0,
  login: void 0,
  signInLoading: false,
  signInError: void 0,
  signUpLoading: false,
  signUpError: void 0,
};

export const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    logout: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signInLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signInLoading = false;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInError = action.error as IResponseError;
        state.signInLoading = false;
      })

      .addCase(signUp.pending, (state) => {
        state.signUpLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpLoading = false;
        state.name = action.payload.name;
        state.login = action.payload.login;
        state.userId = action.payload._id;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpLoading = false;
        state.signUpError = action.error as IResponseError;
      });
  },
});

export default authSlice.reducer;

export const { logout } = authSlice.actions;
