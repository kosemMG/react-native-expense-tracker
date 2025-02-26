import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
	name: 'expenses',
	initialState: {
		expenses: []
	},
	reducers: {
		addExpense: (state, { payload  }) => {
			state.expenses.unshift(payload);
		},
		updateExpense: (state, { payload }) => {
			const { id } = payload;
			const expenseIndex = state.expenses.findIndex(expense => expense.id === id);
			if (expenseIndex >= 0) {
				state.expenses[expenseIndex] = payload;
			}
		},
		removeExpense: (state, { payload }) => {
			state.expenses = state.expenses.filter(expense => expense.id !== payload);
		},
		setExpenses: (state, { payload }) => {
			state.expenses = payload.reverse();
		}
	}
});

export const { addExpense, removeExpense, updateExpense, setExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;