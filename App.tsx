/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <HomeScreen />
    </SafeAreaView>
  );
}

export default App;
