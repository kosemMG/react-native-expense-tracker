import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../store/store';

const AllExpenses: React.FC = () => {
	const expenses = useSelector((state: RootState) => state.expenses.expenses);

	return (
		<ExpensesOutput expenses={expenses} period="Total" fallbackText="No expenses found" />
	);
}

export default AllExpenses;