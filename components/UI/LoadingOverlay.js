import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

export default function LoadingOverlay({ message }) {
	return (
		<View style={styles.container}>
			{message && <Text style={styles.message}>{message}</Text>}
			<ActivityIndicator size="large" color="white"/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 24,
		backgroundColor: GlobalStyles.colors.primary700
	},
	message: {
		fontSize: 16,
		marginBottom: 12,
		color: 'white'
	}
});