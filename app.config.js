require('dotenv/config');

module.exports = {
	expo: {
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
			backgroundColor: '#ffffff'
		},
		ios: {
			supportsTablet: true
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/adaptive-icon.png',
				backgroundColor: '#ffffff'
			}
		},
		web: {
			favicon: './assets/favicon.png'
		},
		extra: {
			API_KEY: process.env.API_KEY
		}
	}
};
