import {View, Text} from 'react-native';
import React from 'react';
import Header from '../component/Header';
import {translate} from '../utils/translate';

type Props = {};

const HomeScreen = () => {
  return (
    <View>
      <Header title={translate('upstox_holding')} />
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
