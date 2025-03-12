export const THEMES = ['light', 'dark', 'auto'];
export type AppTheme = typeof THEMES[number];

type ThemeColors = {
	background: string;
	text: string;
};

export type Theme = {
	mode: 'light' | 'dark';
	colors: ThemeColors;
};

export const LANGUAGES = ['en', 'he'];
export type Language = typeof LANGUAGES[number];

export const CURRENCIES = ['usd', 'ils'];
export type Currency = typeof CURRENCIES[number];

export const LANGUAGE_MAP: Map<Language, string> = new Map([
	['en', 'English'],
	['he', 'Hebrew']
]);

export const CURRENCY_MAP: Map<Currency, string> = new Map([
	['usd', '$ - US Dollar'],
	['ils', '₪ - Israeli Shekel']
]);