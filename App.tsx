import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { setDispatchFunction } from './src/util/http';
import { AppDispatch, RootState, store } from './src/store/store';
import { AuthStack, MainStack } from './src/navigation';

const Navigation: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		setDispatchFunction(dispatch); // Set the dispatch function once on mount
	}, [dispatch]);

	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	return (
		<NavigationContainer>
			{isAuthenticated ? <MainStack /> : <AuthStack />}
		</NavigationContainer>
	);
};

const App: React.FC = () => {
	return (
		<>
			<StatusBar style="light" />
			<Provider store={store}>
				<Navigation />
			</Provider>
		</>
	);
};

export default App;