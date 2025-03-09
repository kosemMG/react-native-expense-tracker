import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
	addRemoteExpense,
	clearError,
	deleteRemoteExpenseThunk,
	updateRemoteExpenseThunk
} from '../store/expenses.slice';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation';
import { AppDispatch, RootState } from '../store/store';
import { Expense, ExpenseDto } from '../dto/expense.dto';

type ManageExpenseProps = NativeStackScreenProps<MainStackParamList, 'ManageExpense'>;

const ManageExpense: React.FC<ManageExpenseProps> = ({ route: { params: { id } = {} }, navigation }) => {
	const { expenses, isSubmitting, error } = useSelector((state: RootState) => state.expenses);
	const { uid } = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch<AppDispatch>();

	const selectedExpense = expenses.find((expense: ExpenseDto) => expense.id === id);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: !!id ? 'Edit Expense' : 'Add Expense'
		});
	}, [navigation, id]);

	const deleteExpenseHandler = async () => {
		if (id && uid) {
			await dispatch(deleteRemoteExpenseThunk({ id, uid }));
			navigation.goBack();
		}
	};

	const confirmHandler = async (expense: Omit<Expense, 'id'>) => {
		if (!uid) throw new Error('Token decoding failed');
		if (id) {
			await dispatch(updateRemoteExpenseThunk({ id, expense, uid }));
			navigation.goBack();
		} else {
			await dispatch(addRemoteExpense({ expense, uid }));
			navigation.goBack();
		}
	};

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={() => dispatch(clearError())}/>;
	}

	if (isSubmitting) {
		return <LoadingOverlay/>;
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				submitButtonLabel={!!id ? 'Update' : 'Add'}
				defaultValues={selectedExpense}
				onCancel={() => navigation.goBack()}
				onSubmit={confirmHandler}
			/>
			{!!id && (
				<View style={styles.deleteContainer}>
					<IconButton onPress={deleteExpenseHandler} icon="trash" color={GlobalStyles.colors.error500} size={36}/>
				</View>
			)}
		</View>
	);
};

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

export default ManageExpense;