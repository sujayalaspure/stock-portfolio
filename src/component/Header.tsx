import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {THEME} from '../utils/theme';

type Props = {
  title: string;
};

const Header = ({title}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.colors.primary,
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.colors.white,
  },
});
