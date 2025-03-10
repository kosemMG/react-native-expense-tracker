import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

interface ButtonProps {
	children: React.ReactNode;
	onPress: () => void;
	mode?: 'flat';
	style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({ children, onPress, mode, style }) => {
	return (
		<View style={style}>
			<Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
				<View style={[styles.button, mode === 'flat' && styles.flat]}>
					<Text style={[styles.buttonText, mode === 'flat' && styles.flatText]}>{children}</Text>
				</View>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 4,
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary500
	},
	flat: {
		backgroundColor: 'transparent'
	},
	buttonText: {
		color: 'white',
		textAlign: 'center'
	},
	flatText: {
		color: GlobalStyles.colors.primary200
	},
	pressed: {
		opacity: 0.75,
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 4
	}
});

export default Button;