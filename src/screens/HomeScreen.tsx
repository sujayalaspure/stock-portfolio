import {View, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../component/Header';
import {translate} from '../utils/translate';
import StockDetailsRow from '../component/StockDetailsRow';
import BottomSheet from '../component/BottomSheet';
import {THEME} from '../utils/theme';

const HomeScreen = () => {
  const [portfolio, setPortfolio] = useState({
    currentValue: 0,
    investedValue: 0,
    todayPnl: 0,
    totalPnl: 0,
  });

  useEffect(() => {
    let currentValue = 0;
    let investedValue = 0;
    let todayPnl = 0;
    mockStock.forEach(stock => {
      currentValue += stock.ltp * stock.quantity;
      investedValue += stock.avgPrice * stock.quantity;
      todayPnl += (stock.close - stock.ltp) * stock.quantity;
    });
    const totalPnl = currentValue - investedValue;
    setPortfolio({currentValue, investedValue, todayPnl, totalPnl});
  }, [mockStock]);

  return (
    <View style={styles.container}>
      <Header title={translate('upstox_holding')} />
      <FlatList
        data={mockStock}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <StockDetailsRow {...item} />}
      />
      <BottomSheet {...portfolio} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: THEME.colors.lightGrey,
  },
});
