import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticate } from '../store/auth.slice';
import { GlobalStyles } from '../constants/styles';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { AuthStackParamList } from './types';
import { AppDispatch } from '../store/store';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthFlow: React.FC = () => {
	const [isTryingLogin, setIsTryingLogin] = useState(true);
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const fetchToken = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token) {
				dispatch(authenticate(token));
			}
			setIsTryingLogin(false);
		};
		fetchToken();
	}, [dispatch]);

	if (isTryingLogin) {
		return <AppLoading />;
	}

	return (
		<Stack.Navigator
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
};

export default AuthFlow;