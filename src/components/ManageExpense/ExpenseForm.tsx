import { Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Input from './Input';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';
import { Expense } from '../../dto/expense.dto';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { formatDateForDisplay, formatDateForStorage } from '../../util/date';

interface FormInput {
	value: string;
	isValid: boolean;
}

interface FormInputsState {
	amount: FormInput;
	date: FormInput;
	description: FormInput;
}

interface ExpenseFormProps {
	submitButtonLabel: string;
	defaultValues?: Expense | null;
	onCancel: () => void;
	onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
	const [inputs, setInputs] = useState<FormInputsState>({
		amount: {
			value: defaultValues?.amount ? defaultValues.amount.toString() : '',
			isValid: true
		},
		date: {
			value: defaultValues?.date ? new Date(defaultValues.date).toISOString().slice(0, 10) : '',
			isValid: true
		},
		description: {
			value: defaultValues?.description || '',
			isValid: true
		}
	});
	const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<Date | null>(inputs.date.value ? new Date(inputs.date.value) : null);

	const inputChangedHandler = (identifier: keyof FormInputsState, value: string) => {
		setInputs((currentInputs: FormInputsState) => ({
			...currentInputs,
			[identifier]: { value, isValid: true }
		}));
	};

	const onDateChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
		if (!selectedDate) return;

		// Use local date components to avoid timezone shift
		const year = selectedDate.getFullYear();
		const month = selectedDate.getMonth();
		const day = selectedDate.getDate();
		const adjustedDate = new Date(year, month, day);
		setSelectedDate(adjustedDate);
	};

	const confirmDate = () => {
		if (selectedDate) {
			// Format the date manually for storage in YYYY-MM-DD
			const formattedDate = formatDateForStorage(selectedDate);
			setInputs((currentInputs) => ({
				...currentInputs,
				date: { value: formattedDate, isValid: true }
			}));
		}
		setShowDatePicker(false); // Close only on confirm
	};

	const submitHandler = () => {
		const expense = {
			amount: +inputs.amount.value,
			date: inputs.date.value ? new Date(inputs.date.value) : new Date(),
			description: inputs.description.value
		};

		const amountIsValid = !isNaN(expense.amount) && expense.amount > 0;
		const dateIsValid = !isNaN(expense.date.getTime());
		const descriptionIsValid = expense.description.trim().length > 0;

		if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
			setInputs(({ amount, date, description }) => ({
				amount: { value: amount.value, isValid: amountIsValid },
				date: { value: date.value, isValid: dateIsValid },
				description: { value: description.value, isValid: descriptionIsValid }
			}));
			return;
		}

		onSubmit({ ...expense, date: expense.date.toISOString() });
	};

	const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

	return (
		<View style={styles.form}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputsRow}>
				<Input
					label="Amount"
					style={styles.rowInput}
					invalid={!inputs.amount.isValid}
					config={{
						keyboardType: 'decimal-pad',
						placeholder: '0.00',
						placeholderTextColor: GlobalStyles.colors.gray50,
						value: inputs.amount.value,
						onChangeText: inputChangedHandler.bind(this, 'amount')
					}}
				/>
				<View style={[styles.rowInput, styles.container]}>
					<Text style={[styles.label, !inputs.date.isValid && styles.invalidLabel]}>Date</Text>
					<TouchableOpacity onPress={() => setShowDatePicker(true)}>
						<Text
							style={[
								styles.input,
								!inputs.date.isValid && styles.invalidInput,
								!inputs.date.value && styles.placeholderText
							]}
						>
							{inputs.date.value ? formatDateForDisplay(new Date(inputs.date.value)) : 'DD.MM.YYYY'}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<Input
				label="Description"
				invalid={!inputs.description.isValid}
				config={{
					multiline: true,
					value: inputs.description.value,
					onChangeText: inputChangedHandler.bind(this, 'description')
				}}
			/>
			{formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your data!</Text>}
			<View style={styles.buttonContainer}>
				<Button style={styles.button} mode="flat" onPress={onCancel}>
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel}
				</Button>
			</View>

			<Modal
				transparent
				animationType="slide"
				visible={showDatePicker}
				onRequestClose={() => setShowDatePicker(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<DateTimePicker
							value={selectedDate || (inputs.date.value ? new Date(inputs.date.value) : new Date())}
							mode="date"
							display={Platform.OS === 'ios' ? 'spinner' : 'default'}
							onChange={onDateChange}
							maximumDate={new Date()}
							style={styles.datePicker}
							textColor="#000"
						/>
						<View style={styles.buttonRow}>
							<Button mode="flat" onPress={() => setShowDatePicker(false)} style={styles.modalButton}>
								Cancel
							</Button>
							<Button mode="flat" onPress={confirmDate} style={styles.modalButton}>
								Done
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

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
	container: {
		marginHorizontal: 4,
		marginVertical: 8
	},
	label: {
		fontSize: 12,
		color: GlobalStyles.colors.primary100,
		marginBottom: 4
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		color: GlobalStyles.colors.primary700,
		padding: 6,
		borderRadius: 6,
		fontSize: 18
	},
	placeholderText: {
		color: GlobalStyles.colors.gray50
	},
	invalidLabel: {
		color: GlobalStyles.colors.error500
	},
	invalidInput: {
		backgroundColor: GlobalStyles.colors.error50
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
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		alignItems: 'center',
		minHeight: 300
	},
	datePicker: {
		width: '100%',
		height: 250
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginTop: 20
	},
	modalButton: {
		flex: 1,
		marginHorizontal: 5
	}
});

export default ExpenseForm;