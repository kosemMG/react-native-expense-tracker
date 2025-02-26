import { StyleSheet, View } from 'react-native';
import { useLayoutEffect, useState } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, removeExpense, updateExpense } from '../store/expenses';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeRemoteExpense, updateRemoteExpense, deleteRemoteExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

export default function ManageExpense({ route: { params: { id } = {} }, navigation }) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(null);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: !!id ? 'Edit Expense' : 'Add Expense'
		});
	}, [navigation, id]);

	const expenses = useSelector(state => state.expenses.expenses);
	const dispatch = useDispatch();

	const selectedExpense = expenses.find(expense => expense.id === id);

	async function deleteExpenseHandler() {
		setIsSubmitting(true);
		try {
			await deleteRemoteExpense(id);
			dispatch(removeExpense(id));
			navigation.goBack();
		} catch (e) {
			setError('Could not delete expense - please try again later');
			setIsSubmitting(false);
		}
	}

	async function confirmHandler(expense) {
		setIsSubmitting(true);
		try {
			if (id) {
				dispatch(updateExpense({ ...expense, id }));
				await updateRemoteExpense(id, expense);
			} else {
				const expenseId = await storeRemoteExpense(expense);
				dispatch(addExpense({ ...expense, id: expenseId }));
			}
			navigation.goBack();
		} catch (e) {
			setError('Could not save expense - please try again later');
			setIsSubmitting(false);
		}
	}

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
	}

	if (isSubmitting) {
		return <LoadingOverlay />;
	}

	return (
		<View style={styles.container}>
			<ExpenseForm submitButtonLabel={!!id ? 'Update' : 'Add'}
									 defaultValues={selectedExpense}
									 onCancel={() => navigation.goBack()}
									 onSubmit={confirmHandler} />
			{!!id && (
				<View style={styles.deleteContainer}>
					<IconButton onPress={deleteExpenseHandler} icon="trash" color={GlobalStyles.colors.error500} size={36}/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary800
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: GlobalStyles.colors.primary200,
		alignItems: 'center'
	}
});