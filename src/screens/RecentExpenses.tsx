import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { getDateMinusDays } from '../util/date';
import { clearError, fetchExpenses } from '../store/expenses.slice';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { AppDispatch, RootState } from '../store/store';
import { Expense } from '../dto/expense.dto';

const RecentExpenses: React.FC = () => {
	const { expenses, isSubmitting, error } = useSelector((state: RootState) => state.expenses);
	const { uid } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (uid) {
			dispatch(fetchExpenses(uid));
		}
	}, [dispatch, uid]);

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={() => dispatch(clearError())}/>;
	}

	if (isSubmitting) {
		return <LoadingOverlay/>;
	}

	const today = new Date();
	const date7DaysAgo = getDateMinusDays(today, 7);
	const recentExpenses = expenses.filter((expense: Expense) => new Date(expense.date) >= date7DaysAgo);

	return (
		<ExpensesOutput
			expenses={recentExpenses}
			period="Last 7 Days"
			fallbackText="No expenses registered for the last 7 days"
		/>
	);
};

export default RecentExpenses;