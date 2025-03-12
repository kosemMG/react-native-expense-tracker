import { Theme } from '../types/settings';
import { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';

export const useTheme = (): Theme => {
	const theme = useContext(ThemeContext);
	if (!theme) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return theme;
};