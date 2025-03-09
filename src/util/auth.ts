import axios, { AxiosError, AxiosResponse } from 'axios';
import Constants from 'expo-constants';
import { FirebaseAuthError } from '../models/firebase-auth-error';

// Define the shape of the API response
interface AuthResponse {
	idToken: string;
	[key: string]: any; // Allow other fields from Firebase (e.g., refreshToken)
}

type AuthMode = 'signUp' | 'signInWithPassword';

const API_KEY = Constants.expoConfig?.extra?.API_KEY || Constants.manifest?.extra?.API_KEY;
if (!API_KEY) {
	throw new Error('API_KEY is not defined in expoConfig or manifest');
}

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const authenticate = async (email: string, password: string, mode: AuthMode): Promise<string> => {
	try {
		const url = `${BASE_URL}${mode}?key=${API_KEY}`;
		const response: AxiosResponse<AuthResponse> = await axios.post(url, { email, password, returnSecureToken: true });
		return response.data.idToken;
	} catch (error) {
		const axiosError = error as AxiosError<FirebaseAuthError>;
		throw new Error(axiosError.response?.data?.error ?? 'Authentication failed');
	}
}

export const createUser = async (email: string, password: string): Promise<string> => {
	return authenticate(email, password, 'signUp');
}

export const login = (email: string, password: string): Promise<string> => {
	return authenticate(email, password, 'signInWithPassword');
}