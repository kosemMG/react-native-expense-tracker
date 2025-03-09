import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AuthForm from './AuthForm';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { setError } from '../../store/auth.slice';
import { Credentials, CredentialsInvalid } from '../../models/credentials';

interface AuthContentProps {
	isLogin?: boolean;
	onAuthenticate: (credentials: { email: string; password: string }) => void;
}

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const AuthContent: React.FC<AuthContentProps> = ({ isLogin = false, onAuthenticate }) => {
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useDispatch<AppDispatch>();

	const [credentialsInvalid, setCredentialsInvalid] = useState<CredentialsInvalid>({
		email: false,
		password: false,
		confirmEmail: false,
		confirmPassword: false
	});

	const switchAuthModeHandler = () => {
		const destination = isLogin ? 'Signup' : 'Login';
		navigation.replace(destination);
	};

	const submitHandler = (credentials: Credentials) => {
		const { email, confirmEmail, password, confirmPassword } = credentials;

		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();

		// Validation rules
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const emailIsValid = emailRegex.test(trimmedEmail);
		const passwordIsValid = trimmedPassword.length > 6;
		const emailsAreEqual = isLogin || trimmedEmail === confirmEmail?.trim();
		const passwordsAreEqual = isLogin || trimmedPassword === confirmPassword?.trim();

		if (!emailIsValid || !passwordIsValid || (!isLogin && (!emailsAreEqual || !passwordsAreEqual))) {
			const errorMessage = [
				!emailIsValid ? 'Invalid email format' : '',
				!passwordIsValid ? 'Password must be at least 7 characters' : '',
				!isLogin && !emailsAreEqual ? 'Emails do not match' : '',
				!isLogin && !passwordsAreEqual ? 'Passwords do not match' : '',
			]
				.filter(Boolean)
				.join('; ');
			dispatch(setError(errorMessage));

			Alert.alert('Invalid input', 'Please check your entered credentials.');

			// Dispatch error to Redux (assumes setError exists in authSlice)
			// Alternatively, handle in parent component
			setCredentialsInvalid({
				email: !emailIsValid,
				confirmEmail: !emailIsValid || !emailsAreEqual,
				password: !passwordIsValid,
				confirmPassword: !passwordIsValid || !passwordsAreEqual,
			});
			return;
		}

		onAuthenticate({ email: trimmedEmail, password: trimmedPassword });
	};

	return (
		<View style={styles.authContent}>
			<AuthForm
				isLogin={isLogin}
				onSubmit={submitHandler}
				credentialsInvalid={credentialsInvalid}
			/>
			<View style={styles.buttons}>
				<Button onPress={switchAuthModeHandler} mode="flat">
					{isLogin ? 'Create a new user' : 'Log in instead'}
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	authContent: {
		marginTop: 64,
		marginHorizontal: 32,
		padding: 16,
		borderRadius: 8,
		backgroundColor: GlobalStyles.colors.primary500,
		elevation: 2,
		shadowColor: 'black',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.35,
		shadowRadius: 4
	},
	buttons: {
		marginTop: 8
	}
});

export default AuthContent;