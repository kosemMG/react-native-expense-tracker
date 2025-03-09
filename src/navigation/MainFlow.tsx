import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';
import ManageExpense from '../screens/ManageExpense';
import React from 'react';
import { MainStackParamList } from './types';
import ExpensesOverview from './ExpensesOverview';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainFlow: React.FC = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyles.colors.accent500 },
			}}
		>
			<Stack.Screen
				name="ExpensesOverview"
				component={ExpensesOverview}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ManageExpense"
				component={ManageExpense}
				options={{ presentation: 'modal' }}
			/>
		</Stack.Navigator>
	);
};

export default MainFlow;