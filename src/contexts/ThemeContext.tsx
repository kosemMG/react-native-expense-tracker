import React, { createContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Theme } from '../types/settings';

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const themePreference = useSelector((state: RootState) => state.settings.theme);
	const [systemTheme, setSystemTheme] = useState<'light' | 'dark' | null>(
		Appearance.getColorScheme() ?? 'light' // Fallback to 'light' if undefined
	);

	useEffect(() => {
		const subscription = Appearance.addChangeListener(({ colorScheme }) => {
			setSystemTheme(colorScheme ?? 'light'); // Fallback to 'light' if undefined
		});
		return () => subscription.remove();
	}, []);

	const activeMode = themePreference === 'auto' ? (systemTheme || 'light') : themePreference as Theme['mode'];

	const theme: Theme = {
		mode: activeMode,
		colors: {
			background: activeMode === 'dark' ? '#000' : '#fff',
			text: activeMode === 'dark' ? '#fff' : '#000'
		}
	};

	return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;