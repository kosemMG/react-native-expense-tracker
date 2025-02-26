import axios from 'axios';

const BASE_URL = 'https://expense-tracker-e0552-default-rtdb.europe-west1.firebasedatabase.app/';

export async function storeRemoteExpense(expense, token, uid) {
	const response = await axios.post(`${BASE_URL}/users/${uid}/expenses.json?auth=${token}`, expense);
	return response.data.name;
}

export async function fetchRemoteExpenses(token, uid) {
	const response = await axios.get(`${BASE_URL}/users/${uid}/expenses.json?auth=${token}`);
	const expenses = [];
	for (const key in response.data) {
		const expense = {
			id: key,
			amount: response.data[key].amount,
			date: response.data[key].date, // Keep as string
			description: response.data[key].description,
		};
		expenses.push(expense);
	}
	return expenses;
}

export function updateRemoteExpense(id, expense, token, uid) {
	return axios.put(`${BASE_URL}/users/${uid}/expenses/${id}.json?auth=${token}`, expense);
}

export function deleteRemoteExpense(id, token, uid) {
	return axios.delete(`${BASE_URL}/users/${uid}/expenses/${id}.json?auth=${token}`);
}