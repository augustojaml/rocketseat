/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';

export function Profile() {
  return (
    <>
      <View>
        <Text testID="text-title">Profile</Text>
        <TextInput
          testID="input-name"
          placeholder="Nome"
          autoCorrect={false}
          value="Augusto"
        />
        <TextInput
          testID="input-surname"
          placeholder="Sobre Nome"
          autoCorrect={false}
          value="Monteiro"
        />
        <Button title="Salvar" onPress={() => {}} />
      </View>
    </>
  );
}
