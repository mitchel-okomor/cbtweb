import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './authSlice';
import {questionsSlice} from './dashboard/questions'


export default configureStore({
  reducer: {
    auth: authSlice.reducer,
	questions: questionsSlice.reducer
  }
});
