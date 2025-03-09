import { StyleSheet, Text, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';
import { ExpenseDto } from '../../dto/expense.dto';
import React from 'react';

interface ExpensesOutputProps {
	expenses: ExpenseDto[];
	period: string;
	fallbackText: string;
}

const ExpensesOutput: React.FC<ExpensesOutputProps> = ({ expenses, period, fallbackText }) => {
	let content = <Text style={styles.fallback}>{fallbackText}</Text>;

	if (expenses.length > 0) {
		content = <ExpensesList expenses={expenses}/>;
	}

	return (
		<View style={styles.container}>
			<ExpensesSummary period={period} expenses={expenses}/>
			{content}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 24,
		paddingBottom: 0,
		paddingHorizontal: 24,
		backgroundColor: GlobalStyles.colors.primary700
	},
	fallback: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center',
		marginTop: 32
	}
});

export default ExpensesOutput;