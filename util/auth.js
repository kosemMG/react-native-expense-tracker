import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig.extra.API_KEY || Constants.manifest.extra.API_KEY;
const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';

async function authenticate(email, password, mode) {
	const url = `${BASE_URL}${mode}?key=${API_KEY}`;
	const response = await axios.post(url, { email, password, returnSecureToken: true });
	return response.data.idToken;
}

export async function createUser(email, password) {
	return authenticate(email, password, 'signUp');
}

export async function login(email, password) {
	return authenticate(email, password, 'signInWithPassword');
}