import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

import LogoSVG from '../../assets/logo.svg';
import { UserPhoto } from '../UserPhoto';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <>
      <View style={styles.container}>
        <LogoSVG />
        <View style={styles.logout}>
          {user && (
            <TouchableOpacity onPress={signOut}>
              <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
          )}
          <UserPhoto imageUri={user?.avatar_url} />
        </View>
      </View>
    </>
  );
}
