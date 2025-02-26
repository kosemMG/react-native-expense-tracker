import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import Input from './Input';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
	const [inputs, setInputs] = useState({
		amount: {
			value: defaultValues ? defaultValues.amount.toString() : '',
			isValid: true
		},
		date: {
			value: defaultValues ? new Date(defaultValues.date).toISOString().slice(0, 10) : '',
			isValid: true
		},
		description: {
			value: defaultValues ? defaultValues.description.toString() : '',
			isValid: true
		}
	});

	function inputChangedHandler(identifier, value) {
		setInputs(currentInputs => ({ ...currentInputs, [identifier]: { value, isValid: true } }));
	}

	function submitHandler() {
		const expense = {
			amount: +inputs.amount.value,
			date: inputs.date.value ? new Date(inputs.date.value) : new Date(),
			description: inputs.description.value
		};

		const amountIsValid = !isNaN(expense.amount) && expense.amount > 0;
		const dateIsValid = expense.date.toString() !== 'Invalid Date';
		const descriptionIsValid = expense.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			// Alert.alert('Invalid input', 'Please check your input values');
			setInputs(({ amount, date, description }) => ({
				amount: { value: amount.value, isValid: amountIsValid },
				date: { value: date.value, isValid: dateIsValid },
				description: { value: description.value, isValid: descriptionIsValid }
			}));
			return;
		}

		onSubmit({ ...expense, date: expense.date.toISOString() });
	}

	const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input label="Amount"
							 style={styles.rowInput}
							 invalid={!inputs.amount.isValid}
							 config={{
								 keyboardType: 'decimal-pad',
								 value: inputs.amount.value,
								 onChangeText: inputChangedHandler.bind(this, 'amount')
							 }}/>
				<Input label="Date"
							 style={styles.rowInput}
							 invalid={!inputs.date.isValid}
							 config={{
								 placeholder: 'YYYY-MM-DD',
								 maxLength: 10,
								 value: inputs.date.value,
								 onChangeText: inputChangedHandler.bind(this, 'date')
							 }}/>
			</View>
			<Input label="Description"
						 invalid={!inputs.description.isValid}
						 config={{
							 multiline: true,
							 value: inputs.description.value,
							 onChangeText: inputChangedHandler.bind(this, 'description')
						 }}/>
			{formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your data!</Text>}
			<View style={styles.buttonContainer}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
				<Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	form: {
		// marginTop: 16
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
		marginVertical: 24,
		textAlign: 'center'
	},
	inputsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rowInput: {
		flex: 1
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		minWidth: 120,
		marginHorizontal: 8
	},
	errorText: {
		textAlign: 'center',
		color: GlobalStyles.colors.error500,
		margin: 8
	}
});