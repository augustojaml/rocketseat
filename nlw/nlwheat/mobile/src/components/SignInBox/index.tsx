import React from 'react';

import { View, Text } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import { COLORS } from '../../theme';
import { Button } from '../Button';
import { styles } from './styles';

export function SignInBox() {
  const { signIn, isSignIn } = useAuth();

  return (
    <>
      <View style={styles.container}>
        <Button
          title="ENTRAR COM GITHUB"
          color={COLORS.BLACK_PRIMARY}
          backgroundColor={COLORS.YELLOW}
          icon="github"
          onPress={signIn}
          isLoading={isSignIn}
        />
      </View>
    </>
  );
}
