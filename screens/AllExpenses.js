import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { useSelector } from 'react-redux';

export default function AllExpenses({ navigation }) {
	const expenses = useSelector(state => state.expenses.expenses);

	return (
		<ExpensesOutput expenses={expenses} period="Total" fallbackText="No expenses found" />
	);
}