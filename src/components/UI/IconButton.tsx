import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

type IoniconsName = keyof typeof Ionicons.glyphMap;

interface IconButtonProps {
	icon: IoniconsName;
	size: number;
	color: string;
	onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, size, color, onPress }) => {
	return (
		<Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
			<View style={styles.buttonContainer}>
				<Ionicons name={icon} size={size} color={color}/>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		borderRadius: 24,
		padding: 6,
		marginHorizontal: 8,
		marginVertical: 2
	},
	pressed: {
		opacity: 0.75
	}
});

export default IconButton;