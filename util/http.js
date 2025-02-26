import axios from 'axios';

const BASE_URL = 'https://expense-tracker-e0552-default-rtdb.europe-west1.firebasedatabase.app/';

export async function storeRemoteExpense(expense, token) {
	const response = await axios.post(`${BASE_URL}/expenses.json?auth=${token}`, expense);
	return response.data.name; // id
}

export async function fetchRemoteExpenses(token) {
	console.log('TOKEN:', token);
	const response = await axios.get(`${BASE_URL}/expenses.json?auth=${token}`);
	const expenses = [];
	for (const key in response.data) {
		const expense = {
			id: key,
			amount: response.data[key].amount,
			date: response.data[key].date,
			description: response.data[key].description
		};
		expenses.push(expense);
	}
	return expenses;
}

export function updateRemoteExpense(id, expense, token) {
	return axios.put(`${BASE_URL}/expenses/${id}.json?auth=${token}`, expense);
}

export function deleteRemoteExpense(id, token) {
	return axios.delete(`${BASE_URL}/expenses/${id}.json?auth=${token}`);
}