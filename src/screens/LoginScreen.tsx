import AuthContent from '../components/Auth/AuthContent';
import React from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../store/auth.slice';
import { AppDispatch, RootState } from '../store/store';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const LoginScreen: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isSubmitting, error } = useSelector((state: RootState) => state.auth);

	const loginHandler = (credentials: { email: string; password: string }) => {
		dispatch(loginUser(credentials));
	};

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={() => dispatch(clearError())}/>;
	}

	if (isSubmitting) {
		return <LoadingOverlay message="Logging in..."/>;
	}

	return <AuthContent isLogin onAuthenticate={loginHandler}/>;
};

export default LoginScreen;
