import axios, { AxiosError, AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../store/auth.slice';
import { FirebaseAuthError } from '../models/firebase-auth-error';
import { Expense, ExpenseDto } from '../dto/expense.dto';

// Define the shape of the Firebase expense data
interface FirebaseExpense {
	amount: number;
	date: string;
	description: string;
	[key: string]: any; // Allow additional fields
}

// Define the response type for storeRemoteExpense
interface StoreExpenseResponse {
	name: string;
}

const BASE_URL = 'https://expense-tracker-e0552-default-rtdb.europe-west1.firebasedatabase.app/';

// Create a custom Axios instance
const api: AxiosInstance = axios.create({
	baseURL: BASE_URL,
});

// Add a response interceptor to handle 401 errors
let dispatchLogout: (action: any) => void; // Singleton dispatcher function

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError<FirebaseAuthError>) => {
		if (error.response?.status === 401) {
			console.log('Token expired, logging out...');
			// Clear AsyncStorage
			await AsyncStorage.removeItem('token').catch((err) =>
				console.error('Failed to remove token from AsyncStorage:', err)
			);
			// Dispatch logout action
			if (dispatchLogout) {
				dispatchLogout(logout());
			}
		}
		return Promise.reject(error);
	}
);

// Set the dispatch function (to be called from a component or store setup)
export const setDispatchFunction = (dispatch: (action: any) => void) => {
	dispatchLogout = dispatch;
};

// Utility to get the token from AsyncStorage (for request configuration)
const getToken = async (): Promise<string | null> => {
	return await AsyncStorage.getItem('token');
};

// Add a request interceptor to include the token
api.interceptors.request.use(
	async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
		const token = await getToken();
		if (token) {
			config.params = { ...config.params, auth: token };
		}
		return config;
	},
	(error) => Promise.reject(error)
);

export const storeRemoteExpense = async (expense: Expense, uid: string): Promise<string> => {
	try {
		const response: AxiosResponse<StoreExpenseResponse> = await api.post(
			`/users/${uid}/expenses.json`,
			expense
		);
		return response.data.name;
	} catch (error) {
		const axiosError = error as AxiosError<FirebaseAuthError>;
		throw new Error(axiosError.response?.data?.error ?? 'Failed to store expense');
	}
};

export const fetchRemoteExpenses = async (uid: string): Promise<ExpenseDto[]> => {
	try {
		const response: AxiosResponse<Record<string, FirebaseExpense>> = await api.get(
			`/users/${uid}/expenses.json`
		);
		console.log('FETCH RESPONSE:', response.data);
		const expenses: ExpenseDto[] = [];
		for (const key in response.data) {
			const expenseData = response.data[key];
			expenses.push({
				id: key,
				amount: expenseData.amount,
				date: expenseData.date,
				description: expenseData.description,
			});
		}
		return expenses;
	} catch (error) {
		const axiosError = error as AxiosError<FirebaseAuthError>;
		console.error('ERROR', axiosError.response?.data);
		throw new Error(axiosError.response?.data?.error ?? 'Failed to fetch expenses');
	}
};

export const updateRemoteExpense = async (
	id: string,
	expense: Expense,
	uid: string
): Promise<void> => {
	try {
		await api.put(`/users/${uid}/expenses/${id}.json`, expense);
	} catch (error) {
		const axiosError = error as AxiosError<FirebaseAuthError>;
		throw new Error(axiosError.response?.data?.error ?? 'Failed to update expense');
	}
};

export const deleteRemoteExpense = async (id: string, uid: string): Promise<void> => {
	try {
		await api.delete(`/users/${uid}/expenses/${id}.json`);
	} catch (error) {
		const axiosError = error as AxiosError<FirebaseAuthError>;
		throw new Error(axiosError.response?.data?.error ?? 'Failed to delete expense');
	}
};

export default api; // Export the Axios instance for custom usage if needed