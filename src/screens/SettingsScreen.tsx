import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Currency, CURRENCY_MAP, Language, LANGUAGE_MAP, LANGUAGES } from '../types/settings';
import { setLanguage, setMode, Settings } from '../store/settings.slice';
import { GlobalStyles } from '../constants/styles';
import Button from '../components/UI/Button';

const SettingsScreen: React.FC = () => {
	const { version, darkMode, language, currency } = useSelector((state: RootState) => state.settings);

	const [settings, setSettings] = useState<Settings>({ darkMode, language, currency });
	const [showModal, setShowModal] = useState(false);

	const selectCurrency = (currency: Currency) => setSettings((prevState: Settings) => ({ ...prevState, currency }));

	const toggleMode = (darkMode: boolean) => {
		setSettings((prevState: Settings) => ({ ...prevState, darkMode }));
		setMode(darkMode);
	}

	const setLang = (language: Language) => {
		setSettings((prevState: Settings) => ({ ...prevState, language }));
		setLanguage(language);
		setShowModal(false);
	}

	return (
		<View style={styles.container}>
			<Text style={[styles.textBase, styles.textWhite, styles.marginBottom]}>App Version: {version}</Text>
			<View style={styles.rowInput}>
				<Text style={[styles.textBase, styles.textWhite]}>Dark Mode:</Text>
				<Switch
					style={styles.marginHorizontal}
					value={settings.darkMode}
					trackColor={{ false: GlobalStyles.colors.primary50, true: GlobalStyles.colors.primary400 }}
					ios_backgroundColor={GlobalStyles.colors.primary50}
					onValueChange={toggleMode}
				/>
			</View>

			<View style={[styles.rowInput]}>
				<Text style={[styles.textBase, styles.textWhite]}>Language: </Text>
				<TouchableOpacity style={styles.marginHorizontal} onPress={() => setShowModal(true)}>
					<Text style={styles.input}>{LANGUAGE_MAP.get(settings.language)}</Text>
				</TouchableOpacity>
			</View>

			<Text style={[styles.textBase, styles.textWhite, styles.marginBottom]}>Currency: {CURRENCY_MAP.get(settings.currency)}</Text>

			<Modal
				transparent
				animationType="slide"
				visible={showModal}
				onRequestClose={() => setShowModal(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<ScrollView>
							{LANGUAGES.map(lang => (
								<TouchableOpacity key={lang} style={[styles.marginHorizontal]} onPress={() => setLang(lang)}>
									<Text style={styles.langButton}>{LANGUAGE_MAP.get(lang)}</Text>
								</TouchableOpacity>
							))}
						</ScrollView>

						<View style={styles.buttonRow}>
							<Button mode="flat" onPress={() => setShowModal(false)} style={styles.modalButton}>
								<Text style={styles.modalButtonLabel}>Cancel</Text>
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 24,
		paddingBottom: 0,
		paddingHorizontal: 24,
		backgroundColor: GlobalStyles.colors.primary700
	},
	textBase: {
		fontSize: 18
	},
	textWhite: {
		color: 'white'
	},
	marginBottom: {
		marginBottom: 15
	},
	rowInput: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginVertical: 15,
	},
	marginHorizontal: {
		marginHorizontal: 20,
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		color: GlobalStyles.colors.primary700,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		width: 200
	},
	modalOverlay: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalContent: {
		backgroundColor: GlobalStyles.colors.primary400,
		padding: 20,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		alignItems: 'center',
		// minHeight: 300
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
	},
	modalButtonLabel: {
		fontSize: 18,
		color: 'white',
	},
	langButton: {
		fontSize: 24,
		color: 'white',
		marginVertical: 10
	}
});

export default SettingsScreen;