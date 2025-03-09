import { createAsyncThunk, createSlice, GetThunkAPI, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { createUser, login } from '../util/auth';
import { ThunkApiConfig } from '../models/thunk-api.config';

interface CustomJwtPayload extends JwtPayload {
	user_id?: string;
	auth_time: number;
	email: string;
	email_verified: boolean;
	firebase: {
		identities: {
			email: string[];
		};
		sign_in_provider: string;
	}
}

interface AuthState {
	token: string | null;
	uid: string | null;
	isAuthenticated: boolean;
	isSubmitting: boolean;
	error: string | null;
}

const initialState: AuthState = {
	token: null,
	uid: null,
	isAuthenticated: false,
	isSubmitting: false,
	error: null
};

interface AuthThunkArg {
	email: string;
	password: string;
}

// Helper function to handle authentication logic
const authenticateState = (state: AuthState, token: string): void => {
	try {
		const decoded = jwtDecode<CustomJwtPayload>(token);
		if (!state.token) {
			AsyncStorage.setItem('token', token).catch((error) =>
				console.error('Failed to save token to AsyncStorage:', error)
			);
		}
		state.token = token;
		state.uid = decoded.user_id || null;
		state.isAuthenticated = true;
		state.error = null;
	} catch (error) {
		state.error = 'JWT decoding failed';
		state.isAuthenticated = false;
	}
};

export const signup = createAsyncThunk<string, AuthThunkArg, ThunkApiConfig>(
	'auth/signup',
	async ({ email, password }: AuthThunkArg, { rejectWithValue }: GetThunkAPI<ThunkApiConfig> ) => {
		try {
			return await createUser(email, password);
		} catch (error) {
			return rejectWithValue((error as Error).message || 'Failed to sign up');
		}
	}
);

export const loginUser = createAsyncThunk<string, AuthThunkArg, ThunkApiConfig>(
	'auth/login',
	async ({ email, password }: AuthThunkArg, { rejectWithValue }: GetThunkAPI<ThunkApiConfig>) => {
		try {
			return await login(email, password);
		} catch (error) {
			return rejectWithValue((error as Error).message || 'Failed to log in');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authenticate: (state, action: PayloadAction<string>) => {
			authenticateState(state, action.payload);
		},
		logout: (state) => {
			AsyncStorage.removeItem('token').catch(error =>
				console.error('Failed to remove token from AsyncStorage:', error)
			);
			state.token = null;
			state.uid = null;
			state.isAuthenticated = false;
		},
		clearError: (state: AuthState) => {
			state.error = null;
		},
		setError: (state: AuthState, action: PayloadAction<string>) => {
			state.error = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isSubmitting = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isSubmitting = false;
				authenticateState(state, action.payload);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isSubmitting = false;
				state.error = action.payload as string;
			})
			.addCase(signup.pending, (state) => {
				state.isSubmitting = true;
				state.error = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.isSubmitting = false;
				authenticateState(state, action.payload);
			})
			.addCase(signup.rejected, (state, action) => {
				state.isSubmitting = false;
				state.error = action.payload as string;
			});
	}});

export const { authenticate, logout, clearError, setError } = authSlice.actions;
export default authSlice.reducer;