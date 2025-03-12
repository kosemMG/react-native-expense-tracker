import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { CURRENCIES, Currency, CURRENCY_MAP, Language, LANGUAGE_MAP, LANGUAGES } from '../types/settings';
import { setCurrency, setLanguage, setTheme, Settings } from '../store/settings.slice';
import { GlobalStyles } from '../constants/styles';
import BottomSheet from '../components/UI/BottomSheet';

const SettingsScreen: React.FC = () => {
	const { version, darkMode, language, currency } = useSelector((state: RootState) => state.settings);

	const [settings, setSettings] = useState<Settings>({ theme: darkMode, language, currency });
	const [showLangModal, setShowLangModal] = useState(false);
	const [showCurrModal, setShowCurrModal] = useState(false);

	const toggleMode = (darkMode: boolean) => {
		setSettings((prevState: Settings) => ({ ...prevState, theme: darkMode }));
		setTheme(darkMode);
	};

	const setLang = (language: Language) => {
		setSettings((prevState: Settings) => ({ ...prevState, language }));
		setLanguage(language);
		setShowLangModal(false);
	};

	const setCurr = (currency: Currency) => {
		setSettings((prevState: Settings) => ({ ...prevState, currency }));
		setCurrency(currency);
		setShowCurrModal(false);
	};

	return (
		<View style={styles.container}>
			<Text style={[styles.textBase, styles.textWhite, styles.marginBottom]}>App Version: {version}</Text>
			<View style={styles.rowInput}>
				<Text style={[styles.textBase, styles.textWhite]}>Dark Mode:</Text>
				<Switch
					style={styles.marginHorizontal}
					value={settings.theme}
					trackColor={{ false: GlobalStyles.colors.primary50, true: GlobalStyles.colors.primary400 }}
					ios_backgroundColor={GlobalStyles.colors.primary50}
					onValueChange={toggleMode}
				/>
			</View>

			<View style={[styles.rowInput]}>
				<Text style={[styles.textBase, styles.textWhite]}>Language: </Text>
				<TouchableOpacity style={styles.marginHorizontal} onPress={() => setShowLangModal(true)}>
					<Text style={styles.input}>{LANGUAGE_MAP.get(settings.language)}</Text>
				</TouchableOpacity>
			</View>

			<View style={[styles.rowInput]}>
				<Text style={[styles.textBase, styles.textWhite]}>Currency: </Text>
				<TouchableOpacity style={styles.marginHorizontal} onPress={() => setShowCurrModal(true)}>
					<Text style={styles.input}>{CURRENCY_MAP.get(settings.currency)}</Text>
				</TouchableOpacity>
			</View>

			<BottomSheet items={LANGUAGES} MAP={LANGUAGE_MAP} set={setLang} showModal={showLangModal} setShowModal={setShowLangModal} />
			<BottomSheet items={CURRENCIES} MAP={CURRENCY_MAP} set={setCurr} showModal={showCurrModal} setShowModal={setShowCurrModal} />
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
		marginVertical: 15
	},
	marginHorizontal: {
		marginHorizontal: 20
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		color: GlobalStyles.colors.primary700,
		padding: 6,
		borderRadius: 6,
		fontSize: 18,
		width: 200
	}
});

export default SettingsScreen;