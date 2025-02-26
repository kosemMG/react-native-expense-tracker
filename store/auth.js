import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		isAuthenticated: false
	},
	reducers: {
		authenticate: (state, { payload }) => {
			console.log('PAYLOAD', payload);
			if (!state.token) {
				AsyncStorage.setItem('token', payload);
			}
			state.token = payload;
			state.isAuthenticated = true;

		},
		logout: (state) => {
			AsyncStorage.removeItem('token');
			state.token = null;
			state.isAuthenticated = false;
		}
	}
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;