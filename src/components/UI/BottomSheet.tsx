import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from './Button';
import React from 'react';
import { GlobalStyles } from '../../constants/styles';

interface BottomSheetProps<T = any> {
	items: T[];
	MAP: Map<T, string>;
	set: (item: T) => void;
	showModal: boolean;
	setShowModal: (show: boolean) => void;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ set, showModal, setShowModal, items, MAP }) => {
	return (
		<Modal
			transparent
			animationType="slide"
			visible={showModal}
			onRequestClose={() => setShowModal(false)}
		>
			<View style={styles.modalOverlay}>
				<View style={styles.bottomSheetContainer}>
					<ScrollView
						style={styles.modalContent}
						contentContainerStyle={styles.scrollContainer}
					>
						{items.map((item) => (
							<TouchableOpacity
								key={item}
								style={styles.marginHorizontal}
								onPress={() => set(item)}
							>
								<Text style={styles.itemButton}>{MAP.get(item)}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					<View style={styles.buttonRow}>
						<Button
							mode="flat"
							onPress={() => setShowModal(false)}
							style={styles.modalButton}
						>
							<Text style={styles.modalButtonLabel}>Cancel</Text>
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	marginHorizontal: {
		marginHorizontal: 20
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	bottomSheetContainer: {
		width: '100%',
		backgroundColor: GlobalStyles.colors.primary400,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	modalContent: {
		padding: 20,
		maxHeight: 300 // Optional: caps the ScrollView height
	},
	scrollContainer: {
		alignItems: 'center'
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		padding: 20
	},
	modalButton: {
		flex: 1,
		marginHorizontal: 5
	},
	modalButtonLabel: {
		fontSize: 16,
		color: 'white'
	},
	itemButton: {
		fontSize: 24,
		color: 'white',
		marginVertical: 10
	}
});

export default BottomSheet;