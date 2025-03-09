import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { ExpenseDto } from '../../dto/expense.dto';
import React from 'react';

interface ExpensesSummaryProps {
	expenses: ExpenseDto[];
	period: string;
}

const ExpensesSummary: React.FC<ExpensesSummaryProps> = ({ period, expenses }) => {
	const expenseSum = expenses.reduce((sum: number, expense: ExpenseDto) => sum + expense.amount, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>{period}</Text>
			<Text style={styles.sum}>${expenseSum.toFixed(2)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 6,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	period: {
		fontSize: 12,
		color: GlobalStyles.colors.primary400
	},
	sum: {
		fontSize: 16,
		fontWeight: 'bold',
		color: GlobalStyles.colors.primary500
	}
});

export default ExpensesSummary;