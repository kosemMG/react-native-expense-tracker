import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/auth.slice';
import { AppDispatch, RootState } from '../store/store';
import { clearError } from '../store/auth.slice';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const SignupScreen = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { isSubmitting, error } = useSelector((state: RootState) => state.auth);

	const signupHandler = (credentials: { email: string; password: string }) => {
		dispatch(signup(credentials));
	};

	if (error && !isSubmitting) {
		return <ErrorOverlay message={error} onConfirm={() => dispatch(clearError())}/>;
	}

	if (isSubmitting) {
		return <LoadingOverlay message="Creating account..."/>;
	}

	return <AuthContent onAuthenticate={signupHandler}/>;
};

export default SignupScreen;
