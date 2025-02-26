import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDateMinusDays } from '../util/date';
import { fetchRemoteExpenses } from '../util/http';
import { setExpenses } from '../store/expenses';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export default function RecentExpenses() {
	const expenses = useSelector(state => state.expenses.expenses);
	const token = useSelector(state => state.auth.token);
	const dispatch = useDispatch();

	const [isFetching, setIsFetching] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getExpenses() {
			setIsFetching(true);
			try {
				const expenses = await fetchRemoteExpenses(token);
				dispatch(setExpenses(expenses));
			} catch (err) {
				setError('Could not fetch expenses!');
			}
			setIsFetching(false);
		}
		getExpenses();
	}, [token]);

	if (!!error && !isFetching) {
		return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
	}

	if (isFetching) {
		return <LoadingOverlay />;
	}

	const recentExpenses = expenses.filter(expense => {
		const today = new Date();
		const date7DaysAgo = getDateMinusDays(today, 7);
		return new Date(expense.date) >= date7DaysAgo;
	});

	return (
		<ExpensesOutput expenses={recentExpenses} period="Last 7 Days"
										fallbackText="No expenses registered for the last 7 days"/>
	);
}