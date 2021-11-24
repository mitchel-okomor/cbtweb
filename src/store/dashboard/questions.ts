// eslint-disable-next-line no-empty-pattern
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {Score} from '../../helpers/datatypes';
import {QUESTIONS, SCORE} from '../../services/endpoints';

import { fetchData } from '../../services/fetch';

//get all orders
export const fetchQuestions = createAsyncThunk(
  'Questions/fetchQuestions',
  async (thunkAPI:any) => {

    try {
      let result = await fetchData(QUESTIONS, null, null, null);

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

 export const submitScore = createAsyncThunk(
	'Questions/submitScore',
	async (data:Score, thunkAPI:any) => {
  
	  try {
		let result = await fetchData(SCORE, data, null, null);
  
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



// Create delivery Slice
export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    data: [],
    isFetching: false,
    isError: false,
    success: false,
    errorMessage: '',
    successMessage: ''
  },
  reducers: {
    clearState: (state:any) => {
      state.isFetching = false;
      state.success = false;
      state.isError = false;
      state.successMessage = null;
      state.errorMessage = null;
      return state;
    }
  },

  extraReducers: {
    [fetchQuestions.fulfilled.type]: (state, { payload }) => {
      state.data = payload.data;

      state.success = true;
      state.successMessage = payload.message;
      state.isFetching = false;
      state.isError = false;
      return state;
    },
    [fetchQuestions.pending.type]: (state) => {
      state.isFetching = true;
    },

    [fetchQuestions.rejected.type]: (state, { payload }) => {
      state.isFetching = false;
      state.success = false;
      state.isError = true;
      state.successMessage = '';
      state.errorMessage = payload?.message
        ? payload?.message
        : payload?.exception;
    },

	[submitScore.fulfilled.type]: (state, { payload }) => {
		state.data = payload.data;
  
		state.success = true;
		state.successMessage = payload.message;
		state.isFetching = false;
		state.isError = false;
		return state;
	  },
	  [submitScore.pending.type]: (state) => {
		state.isFetching = true;
	  },
  
	  [submitScore.rejected.type]: (state, { payload }) => {
		state.isFetching = false;
		state.success = false;
		state.isError = true;
		state.successMessage = '';
		state.errorMessage = payload?.message
		  ? payload?.message
		  : payload?.exception;
	  },

   
  }
});

export const questionsSelector = (state:any) => state.questions;
export const { clearState } = questionsSlice.actions;
