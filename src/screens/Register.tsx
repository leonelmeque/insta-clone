import React from 'react';
import {
  FunctionComponent,
  useCallback,
  useState,
} from 'react';
import { View, Button, TextInput } from 'react-native';
import styled from 'styled-components/native';
import * as firebase from 'firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';

interface RegisterProps {}

const StyledInput = styled(TextInput)``;
const StyledButton = styled(Button)``;

const Register: FunctionComponent<RegisterProps> = (
  props
) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const onSignUp = () => {
    console.log(
      `You have registered with ${email} and password ${password}`
    );
    console.log(Constants.manifest?.extra?.apiKey);
    firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((result) => {
        console.log(result);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <StyledInput
          placeholder='username'
          onChangeText={(value) => setUserName(value)}
        />
        <StyledInput
          placeholder='email'
          onChangeText={setEmail}
          value={email}
        />
        <StyledInput
          placeholder='password'
          secureTextEntry
          onChangeText={(value) => setPassword(value)}
        />
        <StyledButton
          title='Sign Up'
          onPress={() => onSignUp()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
