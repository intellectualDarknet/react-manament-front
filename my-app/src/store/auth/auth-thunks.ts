import { createAsyncThunk } from '@reduxjs/toolkit';
import api from 'api/api';

export const signIn = createAsyncThunk<ISignInResponse, ISignInRequest>(
  'auth/signin',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.post('auth/signin', request);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);

export const signUp = createAsyncThunk<ISignUpResponse, ISignUpRequest>(
  'auth/signup',
  async function (request, { rejectWithValue }) {
    try {
      const data: Response = await api.post('auth/signup', request);
      return await data.json();
    } catch (e: unknown) {
      return rejectWithValue(e as IResponseError);
    }
  }
);
