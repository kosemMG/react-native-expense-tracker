import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		token: null,
		uid: null, // Add UID to state
		isAuthenticated: false,
	},
	reducers: {
		authenticate: (state, { payload }) => {
			const decoded = jwtDecode(payload);
			if (!state.token) {
				AsyncStorage.setItem('token', payload);
			}
			state.token = payload;
			state.uid = decoded.user_id; // Store UID
			state.isAuthenticated = true;
		},
		logout: (state) => {
			AsyncStorage.removeItem('token');
			state.token = null;
			state.uid = null;
			state.isAuthenticated = false;
		},
	},
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;