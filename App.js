import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from './constants/styles';
import AllExpenses from './screens/AllExpenses';
import IconButton from './components/UI/IconButton';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverview() {
	return (
		<BottomTab.Navigator screenOptions={({ navigation }) => ({
			headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
			headerTintColor: 'white',
			tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
			tabBarActiveTintColor: GlobalStyles.colors.accent500,
			headerRight: ({ tintColor }) => (
				<IconButton icon="add" size={24} color={tintColor} onPress={() => navigation.navigate('ManageExpense')} />
			),
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

export default function App() {
	return (
		<>
			<StatusBar style="light" />
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator screenOptions={{
						headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
						headerTintColor: 'white',
					}}>
						<Stack.Screen name="ExpencesOverview" component={ExpensesOverview} options={{ headerShown: false }} />
						<Stack.Screen name="ManageExpense" component={ManageExpense} options={{ presentation: 'modal' }} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
