import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from './constants/styles';
import AllExpenses from './screens/AllExpenses';
import IconButton from './components/UI/IconButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store/store';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import { authenticate, logout } from './store/auth';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AuthStack() {
	const [isTryingLogin, setIsTryingLogin] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		async function fetchToken() {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				dispatch(authenticate(token));
			}
			setIsTryingLogin(false);
		}
		fetchToken();
	}, []);

	if (isTryingLogin) {
		return <AppLoading />;
	}

	return (
		<Stack.Navigator
			id="AuthStack"
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
			}}
		>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignupScreen} />
		</Stack.Navigator>
	);
}

function AuthenticatedStack() {
	return (
		<Stack.Navigator
			id="AuthenticatedStack"
			screenOptions={{
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				contentStyle: { backgroundColor: GlobalStyles.colors.accent500 },
			}}
		>
			<Stack.Screen name="ExpencesOverview" component={ExpensesOverview} options={{ headerShown: false }} />
			<Stack.Screen name="ManageExpense" component={ManageExpense} options={{ presentation: 'modal' }} />
		</Stack.Navigator>
	);
}

function ExpensesOverview() {
	const dispatch = useDispatch();

	return (
		<BottomTab.Navigator
			id="ExpensesOverview"
			screenOptions={({ navigation }) => ({
				headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				headerTintColor: 'white',
				tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
				tabBarActiveTintColor: GlobalStyles.colors.accent500,
				headerRight: ({ tintColor }) => (
					<IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('ManageExpense')} />
				),
				headerLeft: ({ tintColor }) => (
					<IconButton icon="exit" size={24} color={tintColor} onPress={() => dispatch(logout())} />
				)
		})}>
			<BottomTab.Screen name="RecentExpenses" component={RecentExpenses} options={{
				title: 'Recent Expenses',
				tabBarLabel: 'Recent Expenses',
				tabBarIcon: ({ color, size }) => <Ionicons name='hourglass' size={size} color={color} />
			}} />
			<BottomTab.Screen name="AllExpences" component={AllExpenses} options={{
				title: 'All Expenses',
				tabBarLabel: 'All Expenses',
				tabBarIcon: ({ color, size }) => <Ionicons name='calendar' size={size} color={color} />
			}}/>
		</BottomTab.Navigator>
	);
}

function Navigation() {
	const { isAuthenticated } = useSelector(state => state.auth);

	return (
		<NavigationContainer>
			{!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
		</NavigationContainer>
	);
}

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<Provider store={store}>
				<Navigation />
			</Provider>
		</>
	);
}
