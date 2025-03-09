import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';
import React from 'react';
import { ExpenseDto } from '../../dto/expense.dto';

interface ExpensesListProps {
	expenses: ExpenseDto[];
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
	return <FlatList
		data={expenses}
		keyExtractor={({ id }) => id}
		renderItem={({ item }) => <ExpenseItem {...item} />}
	/>;
};

export default ExpensesList;