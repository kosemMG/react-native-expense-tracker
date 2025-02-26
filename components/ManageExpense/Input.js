import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function Input({ label, config, style, invalid }) {
	return (
		<View style={[styles.container, style]}>
			<Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
			<TextInput {...config} style={[styles.input, config?.multiline && styles.inputMultiline, invalid && styles.invalidInput]} />
		</View>
	);
}

const styles = StyleSheet.create({
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
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: 'top'
	},
	invalidLabel: {
		color: GlobalStyles.colors.error500
	},
	invalidInput: {
		backgroundColor: GlobalStyles.colors.error50
	}
});