import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import React from 'react';

interface InputProps extends Pick<TextInputProps, 'keyboardType'> {
  label: string;
  secure?: boolean; // Optional, defaults to false
  onUpdateValue: (value: string) => void; // Callback for onChangeText
  value: string; // Current value of the input
  isInvalid: boolean; // Indicates if the input is invalid
}

const Input: React.FC<InputProps> = ({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[styles.input, isInvalid && styles.inputInvalid]}
        autoCorrect={false}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: GlobalStyles.colors.error500,
  },
  input: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

export default Input;
