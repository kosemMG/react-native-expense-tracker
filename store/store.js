import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expenses';
import authReducer from './auth';

export const store = configureStore({
	reducer: {
		expenses: expensesReducer,
		auth: authReducer
	}
});