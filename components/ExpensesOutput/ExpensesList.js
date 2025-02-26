import { FlatList } from 'react-native';
import ExpenseItem from './ExpenseItem';

export default function ExpensesList({ expenses }) {
	return <FlatList data={expenses} keyExtractor={({ id }) => id} renderItem={({ item }) => <ExpenseItem {...item} />} />
}