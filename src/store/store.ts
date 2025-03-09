import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './expenses.slice';
import authReducer from './auth.slice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
	reducer: {
		expenses: expensesReducer,
		auth: authReducer,
	},
	// Optional: Add middleware or devTools
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['authenticate', 'logout', 'expenses/fetchExpenses', 'expenses/addRemoteExpense'], // Ignore AsyncStorage actions
				ignoredPaths: ['auth.token', 'expenses.error'], // Ignore non-serializable token
			},
		}),
	devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;