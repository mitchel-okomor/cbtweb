// eslint-disable-next-line no-empty-pattern
import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {REGISTER, LOGIN, FETCHUSER} from '../services/endpoints';
import { cookieService } from '../services/authServices';
import { setStorageItem, getStorageItem } from '../helpers/utilities';
import { fetchData } from '../services/fetch';

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunkAPI) => {
    try {
      let result = await fetchData(REGISTER, data, null, null);

      if (result.status === 'success') {
        return { ...result };
      } else {
        return thunkAPI.rejectWithValue(result);
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const login = createAsyncThunk('auth/Login', async (data, thunkAPI) => {
  try {
    let result = await fetchData(LOGIN, data, null, null);
    if (result.status === 'success') {
      cookieService().setToken('access_token', result.data.token);
      cookieService().setToken('expiresIn', result.data.expiresIn);
      setStorageItem('user', JSON.stringify(result.data.user));

      return { ...result };
    } else {
      return thunkAPI.rejectWithValue(result);
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

// export const confirmEmail = createAsyncThunk(
//   'auth/ConfirmEmail',
//   async (token, thunkAPI) => {
//     try {
//       let result = await fetchData(UrlService().confirmEmail(token), {});
//       if (result.status === 'success') {
//         return { ...result };
//       } else {
//         return thunkAPI.rejectWithValue(result);
//       }
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
// export const forgotPassword = createAsyncThunk(
//   'auth/forgotPassword',
//   async (data, thunkAPI) => {
//     try {
//       let result = await fetchData(UrlService().forgotPassword(), data);
//       if (result.status === 'success') {
//         return { ...result };
//       } else {
//         return thunkAPI.rejectWithValue(result);
//       }
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

// export const resetPassword = createAsyncThunk(
//   'auth/verifyToken',
//   async (payload, thunkAPI) => {
//     console.log(payload);
//     try {
//       let result = await fetchData(UrlService().resetPassword(payload.token), {
//         newPassword: payload.newPassword
//       });
//       if (result.status === 'success') {
//         return { ...result };
//       } else {
//         return thunkAPI.rejectWithValue(result);
//       }
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
//chenge password
// export const changePassword = createAsyncThunk(
//   'auth/changePassword',
//   async (payload, thunkAPI) => {
//     try {
//       let result = await fetchData(UrlService().changePassword(payload), {
//         newPassword: payload.newPassword
//       });
//       if (result.status === 'success') {
//         return { ...result };
//       } else {
//         return thunkAPI.rejectWithValue(result);
//       }
//     } catch (e) {
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
// Create authentication Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {},
    isFetching: false,
    isError: false,
    success: false,
    errorMessage: '',
    successMessage: ''
  },
  reducers: {
    clearState: (state) => {
      state.isFetching = false;
      state.success = false;
      state.isError = false;
      return state;
    },

    logoutUser: (state) => {
      cookieService().removeToken('access_token');
      cookieService().removeToken('expiresIn');
      state.data = {};
      state.isFetching = false;
      state.success = false;
      state.isError = false;
      return state;
    }
  },

  extraReducers: {
    // Create account
    [register.fulfilled.type]: (state:any, { payload }:any) => {
      state.success = true;
      state.successMessage = payload.message;
      state.isFetching = false;
      state.isError = false;
      return state;
    },
    [register.pending.type]: (state:any) => {
      state.isFetching = true;
    },

    [register.rejected.type]: (state:any, { payload }:any) => {
      state.isFetching = false;
      state.success = false;
      state.isError = true;
      state.successMessage = '';
      state.errorMessage = payload?.message
        ? payload?.message
        : payload?.exception;
    },

    // Login
    [login.fulfilled.type]: (state:any, { payload }:any) => {
      state.data = payload.data ?? {};
      state.success = true;
      state.successMessage = payload.message;
      state.isFetching = false;
      state.isError = false;
      return state;
    },
    [login.pending.type]: (state:any) => {
      state.isFetching = true;
    },

    [login.rejected.type]: (state:any, { payload }:any) => {
      state.isFetching = false;
      state.success = false;
      state.isError = true;
      state.successMessage = '';
      state.errorMessage = payload?.message
        ? payload?.message
        : payload?.exception;
    },

    //confirm email
    // [confirmEmail.fulfilled]: (state, { payload }) => {
    //   state.data = payload.data ?? {};
    //   state.success = true;
    //   state.successMessage = payload.message;
    //   state.isFetching = false;
    //   state.isError = false;
    //   return state;
    // },
    // [confirmEmail.pending]: (state) => {
    //   state.isFetching = true;
    // },

    // [confirmEmail.rejected]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.success = false;
    //   state.isError = true;
    //   state.successMessage = '';
    //   state.errorMessage = payload?.message
    //     ? payload?.message
    //     : payload?.exception;
    // },

    // //forgot password
    // [forgotPassword.fulfilled]: (state, { payload }) => {
    //   state.data = payload.data ?? {};
    //   state.success = true;
    //   state.successMessage = payload.message;
    //   state.isFetching = false;
    //   state.isError = false;
    //   return state;
    // },
    // [forgotPassword.pending]: (state) => {
    //   state.isFetching = true;
    // },

    // [forgotPassword.rejected]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.success = false;
    //   state.isError = true;
    //   state.successMessage = '';
    //   state.errorMessage = payload?.message
    //     ? payload?.message
    //     : payload?.exception;
    // },

    // //reset password
    // [resetPassword.fulfilled]: (state, { payload }) => {
    //   state.data = payload.data ?? {};
    //   state.success = true;
    //   state.successMessage = payload.message;
    //   state.isFetching = false;
    //   state.isError = false;
    //   return state;
    // },
    // [resetPassword.pending]: (state) => {
    //   state.isFetching = true;
    // },

    // [resetPassword.rejected]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.success = false;
    //   state.isError = true;
    //   state.successMessage = '';
    //   state.errorMessage = payload?.message
    //     ? payload?.message
    //     : payload?.exception;
    // },

    // //reset password
    // [changePassword.fulfilled]: (state, { payload }) => {
    //   state.data = payload.data ?? {};
    //   state.success = true;
    //   state.successMessage = payload.message;
    //   state.isFetching = false;
    //   state.isError = false;
    //   return state;
    // },
    // [changePassword.pending]: (state) => {
    //   state.isFetching = true;
    // },

    // [changePassword.rejected]: (state, { payload }) => {
    //   state.isFetching = false;
    //   state.success = false;
    //   state.isError = true;
    //   state.successMessage = '';
    //   state.errorMessage = payload?.message
    //     ? payload?.message
    //     : payload?.exception;
    // }
  }
});

export const authSelector = (state:any) => state.auth;
export const { clearState,logoutUser } = authSlice.actions;
