import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../store';
import AuthService from '../../API/AuthService';
import { authUser, checkToken } from './authAction';

interface AuthState {
  isAuth: boolean;
  isAuthInProgress: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  isAuthInProgress: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startAuth: (state) => {
      console.log("Starting auth. isAuthInProgress = true");
      state.isAuthInProgress = true;
    },
    successAuth: (state) => {
      console.log("Success auth. auth = true, isAuthInProgress = false");
      state.isAuth = true;
      state.isAuthInProgress = false;
    },
    failAuth: (state) => {
      console.log("Fail auth. auth = false, isAuthInProgress = false");
      state.isAuth = false;
      state.isAuthInProgress = false;
    },
    logout: (state) => {
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.isAuthInProgress = true
      })
      .addCase(checkToken.fulfilled, (state) => {
        state.isAuthInProgress = false
        state.isAuth = true
      })
      .addCase(checkToken.rejected, (state) => {
        state.isAuthInProgress = false
        state.isAuth = true
      })
      .addCase(authUser.pending, (state) => {
        state.isAuthInProgress = true;
      })
      .addCase(authUser.fulfilled, (state) => {
        state.isAuthInProgress = false;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state) => {
        state.isAuthInProgress = false;
        state.isAuth = false;
      });
  },
});

export const { startAuth, successAuth, failAuth, logout } = authSlice.actions;

export const authenticateUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(startAuth());
  try {
    const resp = await AuthService.login(username, password);
    if (resp.data.error_code === 0) {
      const token = resp.data.data.token;
      document.cookie = `token=${token}; path=/;`;

      dispatch(successAuth());
    } else {
      dispatch(failAuth());
    }
  } catch (error) {
    dispatch(failAuth());
    console.error(error);
  }
};

export const checkUser = () => async (dispatch: AppDispatch) => {
  dispatch(startAuth());
  console.log("CheckUser is running.");
  try {
    const resp = await AuthService.checkToken();
    console.log(resp, 1);
    if (resp.data?.data) {
      console.log(2);
      dispatch(successAuth());
    } else if (resp.data.error_text === 'Access deny') {
      console.log(33);
      dispatch(failAuth());
    }
  } catch (error) {
    dispatch(failAuth());
    console.error(error);
  }
};

export default authSlice.reducer;
