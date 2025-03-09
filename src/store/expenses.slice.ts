import { createAsyncThunk, createSlice, GetThunkAPI, PayloadAction } from '@reduxjs/toolkit';
import { deleteRemoteExpense, fetchRemoteExpenses, storeRemoteExpense, updateRemoteExpense } from '../util/http';
import { ThunkApiConfig } from '../models/thunk-api.config';
import { Expense, ExpenseDto } from '../dto/expense.dto';

interface ExpensesState {
	expenses: ExpenseDto[];
	isSubmitting: boolean;
	error: string | null;
}

const initialState: ExpensesState = {
	expenses: [],
	isSubmitting: false,
	error: null
};

type AddExpenseThunkArg = { expense: Expense; uid: string };
type UpdateExpenseThunkArg = { id: string; expense: Expense; uid: string };
type DeleteExpenseThunkArg = { id: string; uid: string };

export const fetchExpenses = createAsyncThunk<ExpenseDto[], string, ThunkApiConfig>(
	'expenses/fetchExpenses',
	async (uid: string, { rejectWithValue }: GetThunkAPI<ThunkApiConfig>) => {
		try {
			return await fetchRemoteExpenses(uid);
		} catch (error) {
			return rejectWithValue((error as Error).message ?? 'Failed to fetch expenses');
		}
	}
);

export const addRemoteExpense = createAsyncThunk<string, AddExpenseThunkArg, ThunkApiConfig>(
	'expenses/addRemoteExpense',
	async ({ expense, uid }: AddExpenseThunkArg, { dispatch, rejectWithValue }: GetThunkAPI<ThunkApiConfig>) => {
		try {
			const id = await storeRemoteExpense(expense, uid);
			dispatch(addExpense({ ...expense, id }));
			return id;
		} catch (error) {
			return rejectWithValue((error as Error).message || 'Failed to add expense');
		}
	}
);

export const updateRemoteExpenseThunk = createAsyncThunk<void, UpdateExpenseThunkArg, ThunkApiConfig>(
	'expenses/updateRemoteExpense',
	async ({ id, expense, uid }: UpdateExpenseThunkArg, { dispatch, rejectWithValue }: GetThunkAPI<ThunkApiConfig>) => {
		try {
			dispatch(updateExpense({ ...expense, id }));
			await updateRemoteExpense(id, expense, uid);
		} catch (error) {
			return rejectWithValue((error as Error).message || 'Failed to update expense');
		}
	}
);

export const deleteRemoteExpenseThunk = createAsyncThunk<void, DeleteExpenseThunkArg, ThunkApiConfig>(
	'expenses/deleteRemoteExpense',
	async ({ id, uid }: DeleteExpenseThunkArg, { dispatch, rejectWithValue }: GetThunkAPI<ThunkApiConfig>) => {
		try {
			await deleteRemoteExpense(id, uid);
			dispatch(removeExpense(id));
		} catch (error) {
			return rejectWithValue((error as Error).message || 'Failed to delete expense');
		}
	}
);

const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		addExpense: (state: ExpensesState, { payload }: PayloadAction<ExpenseDto>) => {
			state.expenses.unshift(payload);
		},
		updateExpense: (state: ExpensesState, action: PayloadAction<ExpenseDto>) => {
			const { id } = action.payload;
			const expenseIndex = state.expenses.findIndex(expense => expense.id === id);
			if (expenseIndex >= 0) {
				state.expenses[expenseIndex] = { ...state.expenses[expenseIndex], ...action.payload };
			}
		},
		removeExpense: (state: ExpensesState, action: PayloadAction<string>) => {
			state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
		},
		setExpenses: (state: ExpensesState, { payload }) => {
			state.expenses = payload.reverse();
		},
		clearError: (state: ExpensesState) => {
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// Fetch expenses
			.addCase(fetchExpenses.pending, (state) => {
				state.isSubmitting = true;
				state.error = null;
			})
			.addCase(fetchExpenses.fulfilled, (state, action) => {
				state.isSubmitting = false;
				state.expenses = action.payload;
			})
			.addCase(fetchExpenses.rejected, (state, action) => {
				state.isSubmitting = false;
				state.error = action.error.message ?? 'Failed to fetch expenses';
			})
			// Add expense
			.addCase(addRemoteExpense.pending, (state) => {
				state.isSubmitting = true;
				state.error = null;
			})
			.addCase(addRemoteExpense.fulfilled, (state) => {
				state.isSubmitting = false;
			})
			.addCase(addRemoteExpense.rejected, (state, action) => {
				state.isSubmitting = false;
				state.error = action.error.message ?? 'Failed to add expense';
			})
			// Update expense
			.addCase(updateRemoteExpenseThunk.pending, (state) => {
				state.isSubmitting = true;
				state.error = null;
			})
			.addCase(updateRemoteExpenseThunk.fulfilled, (state) => {
				state.isSubmitting = false;
			})
			.addCase(updateRemoteExpenseThunk.rejected, (state, action) => {
				state.isSubmitting = false;
				state.error = action.error.message ?? 'Failed to update expense';
			})
			// Delete expense
			.addCase(deleteRemoteExpenseThunk.pending, (state) => {
				state.isSubmitting = true;
				state.error = null;
			})
			.addCase(deleteRemoteExpenseThunk.fulfilled, (state) => {
				state.isSubmitting = false;
			})
			.addCase(deleteRemoteExpenseThunk.rejected, (state, action) => {
				state.isSubmitting = false;
				state.error = action.error.message ?? 'Failed to delete expense';
			});
	}
});

export const { addExpense, removeExpense, updateExpense, setExpenses, clearError } = expensesSlice.actions;
export default expensesSlice.reducer;