import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';
import { useNavigation } from '@react-navigation/native';
import { ExpenseDto } from '../../dto/expense.dto';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ExpenseStackParamList } from '../../navigation';

interface ExpenseItemProps extends ExpenseDto {
	style?: StyleProp<ViewStyle>;
}

type NavigationProp = NativeStackNavigationProp<ExpenseStackParamList, 'ManageExpense'>;

const ExpenseItem: React.FC<ExpenseItemProps> = ({ id, description, amount, date, style }) => {
	const navigation = useNavigation<NavigationProp>();

	const formattedDate = getFormattedDate(new Date(date));
	const formattedAmount = `$${amount.toFixed(2)}`;

	const handlePress = () => navigation.navigate('ManageExpense', { id });

	return (
		<Pressable
			onPress={handlePress}
			style={({ pressed }) => [style, pressed && styles.pressed]}
			android_ripple={{ color: GlobalStyles.colors.primary100 }}
		>
			<View style={styles.expenseItem}>
				<View>
					<Text style={[styles.textBase, styles.description]}>{description}</Text>
					<Text style={styles.textBase}>{formattedDate}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>{formattedAmount}</Text>
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	expenseItem: {
		padding: 12,
		marginVertical: 8,
		backgroundColor: GlobalStyles.colors.primary500,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderRadius: 6,
		elevation: 3,
		shadowColor: GlobalStyles.colors.gray500,
		shadowRadius: 4,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.4
	},
	pressed: {
		opacity: 0.75
	},
	textBase: {
		color: GlobalStyles.colors.primary50
	},
	description: {
		fontSize: 16,
		marginBottom: 4,
		fontWeight: 'bold'
	},
	amountContainer: {
		paddingHorizontal: 12,
		paddingVertical: 4,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
		minWidth: 80
	},
	amount: {
		color: GlobalStyles.colors.primary500,
		fontWeight: 'bold'
	}
});

export default ExpenseItem;