import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency, Language } from '../types/settings';

interface SettingsState {
	version: string;
	darkMode: boolean;
	language: Language;
	currency: Currency;
}

export type Settings = Omit<SettingsState, 'version'>;

const initialState: SettingsState = {
	version: '1.0.0 (alpha)',
	darkMode: true,
	currency: 'usd',
	language: 'en'
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setVersion: (state: SettingsState, action: PayloadAction<string>) => {
			state.version = action.payload;
			AsyncStorage.setItem('version', state.version).catch(error =>
				console.error('Failed to set app version to AsyncStorage:', error)
			);
		},
		setMode: (state: SettingsState, action: PayloadAction<boolean>) => {
			state.darkMode = action.payload;
			AsyncStorage.setItem('darkMode', state.darkMode.toString()).catch(error =>
				console.error('Failed to set mode to AsyncStorage:', error)
			);
		},
		setLanguage: (state: SettingsState, action: PayloadAction<Language>) => {
			state.language = action.payload;
			AsyncStorage.setItem('language', state.language).catch(error =>
				console.error('Failed to set app language to AsyncStorage:', error)
			);
		},
		setCurrency: (state: SettingsState, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
			AsyncStorage.setItem('currency', state.currency).catch(error =>
				console.error('Failed to set currency to AsyncStorage:', error)
			);
		}
	}
});

export const { setVersion, setMode, setCurrency, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;