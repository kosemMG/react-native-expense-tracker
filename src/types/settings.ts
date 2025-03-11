export const LANGUAGES = ['en', 'he'];
export type Language = typeof LANGUAGES[number];

export const CURRENCIES = ['en', 'he'];
export type Currency = typeof CURRENCIES[number];

export const LANGUAGE_MAP: Map<Language, string> = new Map([
	['en', 'English'],
	['he', 'Hebrew']
]);

export const CURRENCY_MAP: Map<Currency, string> = new Map([
	['usd', '$ - United States Dollar'],
	['ils', '₪ - Israeli Shekel']
]);