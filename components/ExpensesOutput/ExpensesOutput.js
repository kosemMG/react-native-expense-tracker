import { StyleSheet, Text, View } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

export default function ExpensesOutput({ expenses, period, fallbackText }) {
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
}

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