import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency, Language, AppTheme, THEMES } from '../types/settings';

interface SettingsState {
	version: string;
	theme: AppTheme;
	language: Language;
	currency: Currency;
}

export type Settings = Omit<SettingsState, 'version'>;

const initialState: SettingsState = {
	version: '1.0.0 (alpha)',
	theme: 'auto',
	currency: 'usd',
	language: 'en'
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setVersion: (state: SettingsState, action: PayloadAction<string>) => {
			state.version = action.payload;
			AsyncStorage.setItem('version', state.version).catch((error) =>
				console.error('Failed to set app version to AsyncStorage:', error)
			);
		},
		setTheme: (state: SettingsState, action: PayloadAction<AppTheme>) => {
			state.theme = action.payload;
			AsyncStorage.setItem('theme', state.theme).catch((error) =>
				console.error('Failed to set theme to AsyncStorage:', error)
			);
		},
		setLanguage: (state: SettingsState, action: PayloadAction<Language>) => {
			state.language = action.payload;
			AsyncStorage.setItem('language', state.language).catch((error) =>
				console.error('Failed to set app language to AsyncStorage:', error)
			);
		},
		setCurrency: (state: SettingsState, action: PayloadAction<Currency>) => {
			state.currency = action.payload;
			AsyncStorage.setItem('currency', state.currency).catch((error) =>
				console.error('Failed to set currency to AsyncStorage:', error)
			);
		}
	}
});

// Async action to initialize settings from AsyncStorage
export const initializeSettings = () => async (dispatch: any) => {
	try {
		const theme = (await AsyncStorage.getItem('theme')) as AppTheme | null;
		if (theme && THEMES.includes(theme)) {
			dispatch(setTheme(theme));
		}
	} catch (error) {
		console.error('Failed to initialize theme from AsyncStorage:', error);
	}
};

export const { setVersion, setTheme, setCurrency, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;