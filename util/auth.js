import axios from 'axios';

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';
const API_KEY = 'AIzaSyDzaTa2bRXnupxmQBtiNp3f842D6ufLNYE';

async function authenticate(email, password, mode) {
	const url = `${BASE_URL}${mode}?key=${API_KEY}`;
	console.log('URL:', url);
	console.log('REQUEST:', JSON.stringify({ email, password, returnSecureToken: true }));
	const response = await axios.post(url, { email, password, returnSecureToken: true });
	console.log(response.data);
	return response.data.idToken;
}

export async function createUser(email, password) {
	return authenticate(email, password, 'signUp');
}

export async function login(email, password) {
	return authenticate(email, password, 'signInWithPassword');
}