import 'dotenv/config';
import { ExpoConfig } from '@expo/config-types';

interface Env {
	API_KEY?: string;
}

const config: ExpoConfig & { extra: Env } = {
	name: 'expense-tracker',
	slug: 'expense-tracker',
	version: '1.0.0',
	orientation: 'portrait',
	icon: './assets/icon.png',
	userInterfaceStyle: 'light',
	newArchEnabled: true,
	splash: {
		image: './assets/splash-icon.png',
		resizeMode: 'contain',
		backgroundColor: '#ffffff',
	},
	ios: {
		supportsTablet: true,
	},
	android: {
		adaptiveIcon: {
			foregroundImage: './assets/adaptive-icon.png',
			backgroundColor: '#ffffff',
		},
	},
	web: {
		favicon: './assets/favicon.png',
	},
	extra: {
		API_KEY: process.env.API_KEY, // Type-safe access to env vars
	},
};

export default config;