import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Input from './Input';
import Button from '../UI/Button';
import { Credentials, CredentialsInvalid } from '../../models/credentials';
import { GlobalStyles } from '../../constants/styles';

interface FormInputs {
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

interface AuthFormProps {
  isLogin?: boolean;
  onSubmit: (credentials: Credentials) => void;
  credentialsInvalid: CredentialsInvalid;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false, onSubmit, credentialsInvalid }) => {
  const [inputs, setInputs] = useState<FormInputs>({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  // const {
  //   email: emailIsInvalid,
  //   confirmEmail: emailsDontMatch,
  //   password: passwordIsInvalid,
  //   confirmPassword: passwordsDontMatch,
  // } = credentialsInvalid;

  const updateInputValueHandler = (field: keyof FormInputs, value: string) => {
    setInputs((prevInputs: FormInputs): FormInputs => ({
      ...prevInputs,
      [field]: value
    }));
  };

  // function updateInputValueHandler(inputType, enteredValue) {
  //   switch (inputType) {
  //     case 'email':
  //       setEnteredEmail(enteredValue);
  //       break;
  //     case 'confirmEmail':
  //       setEnteredConfirmEmail(enteredValue);
  //       break;
  //     case 'password':
  //       setEnteredPassword(enteredValue);
  //       break;
  //     case 'confirmPassword':
  //       setEnteredConfirmPassword(enteredValue);
  //       break;
  //   }
  // }

  // function submitHandler() {
  //   onSubmit({
  //     email: enteredEmail,
  //     confirmEmail: enteredConfirmEmail,
  //     password: enteredPassword,
  //     confirmPassword: enteredConfirmPassword,
  //   });
  // }

  const submitHandler = () => {
    onSubmit({
      email: inputs.email,
      confirmEmail: isLogin ? undefined : inputs.confirmEmail,
      password: inputs.password,
      confirmPassword: isLogin ? undefined : inputs.confirmPassword,
    });
  };

  const getErrorMessage = () => {
    const errors: string[] = [];
    if (credentialsInvalid.email) errors.push('Invalid email format');
    if (credentialsInvalid.confirmEmail) errors.push('Emails do not match');
    if (credentialsInvalid.password) errors.push('Password must be at least 7 characters');
    if (credentialsInvalid.confirmPassword) errors.push('Passwords do not match');
    return errors.join('; ');
  };

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Email Address"
          keyboardType="email-address"
          onUpdateValue={(value) => updateInputValueHandler('email', value)}
          value={inputs.email}
          isInvalid={credentialsInvalid.email}
        />
        {!isLogin && (
          <Input
            label="Confirm Email Address"
            keyboardType="email-address"
            onUpdateValue={(value) => updateInputValueHandler('confirmEmail', value)}
            value={inputs.confirmEmail}
            isInvalid={credentialsInvalid.confirmEmail}
          />
        )}
        <Input
          label="Password"
          secure
          onUpdateValue={(value) => updateInputValueHandler('password', value)}
          value={inputs.password}
          isInvalid={credentialsInvalid.password}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            secure
            onUpdateValue={(value) => updateInputValueHandler('confirmPassword', value)}
            value={inputs.confirmPassword}
            isInvalid={credentialsInvalid.confirmPassword}
          />
        )}
        {(credentialsInvalid.email ||
          credentialsInvalid.confirmEmail ||
          credentialsInvalid.password ||
          credentialsInvalid.confirmPassword) && (
          <Text style={styles.errorText}>
            {getErrorMessage()}
          </Text>
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>{isLogin ? 'Log In' : 'Sign Up'}</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  buttons: {
    marginTop: 12,
  },
  errorText: {
    color: GlobalStyles.colors.error500,
    textAlign: 'center',
    marginVertical: 8
  }
});

export default AuthForm;