import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GlobalStyles } from '../constants/styles';
import RecentExpenses from '../screens/RecentExpenses';
import AllExpenses from '../screens/AllExpenses';
import IconButton from '../components/UI/IconButton';
import { logout } from '../store/auth.slice';
import { AppDispatch } from '../store/store';
import { ExpensesOverviewParamList, MainStackParamList } from './types';

type ExpensesOverviewProps = NativeStackScreenProps<MainStackParamList, 'ExpensesOverview'>;

const BottomTab = createBottomTabNavigator<ExpensesOverviewParamList>();

const ExpensesOverview: React.FC<ExpensesOverviewProps> = ({ navigation }) => {
	const dispatch = useDispatch<AppDispatch>();

	return (
		<BottomTab.Navigator
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500,  },
				tabBarActiveTintColor: GlobalStyles.colors.primary50,
				headerRight: ({ tintColor }) => (
					<IconButton
						icon="add"
						size={24}
						color={tintColor as string}
						onPress={() => navigation.navigate('ManageExpense', { id: undefined })}
					/>
				),
				headerLeft: ({ tintColor }) => (
					<IconButton
						icon="exit"
						size={24}
						color={tintColor as string}
						onPress={() => dispatch(logout())}
					/>
				),
			}}
		>
			<BottomTab.Screen
				name="RecentExpenses"
				component={RecentExpenses}
				options={{
					title: 'Recent Expenses',
					tabBarLabel: 'Recent Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="hourglass" size={size} color={color} />
					),
				}}
			/>
			<BottomTab.Screen
				name="AllExpenses"
				component={AllExpenses}
				options={{
					title: 'All Expenses',
					tabBarLabel: 'All Expenses',
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="calendar" size={size} color={color} />
					),
				}}
			/>
		</BottomTab.Navigator>
	);
};

export default ExpensesOverview;