import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../component/Header';
import {translate} from '../utils/translate';
import StockDetailsRow from '../component/StockDetailsRow';
import BottomSheet from '../component/BottomSheet';
import {THEME} from '../utils/theme';
import {useFetchStockList} from '../hooks/useFetch';

const HomeScreen = () => {
  const [portfolio, setPortfolio] = useState({
    currentValue: 0,
    investedValue: 0,
    todayPnl: 0,
    totalPnl: 0,
  });

  const {data, isLoading, error, fetchStockList} = useFetchStockList();

  useEffect(() => {
    let currentValue = 0;
    let investedValue = 0;
    let todayPnl = 0;
    data.forEach(stock => {
      currentValue += stock.ltp * stock.quantity;
      investedValue += stock.avgPrice * stock.quantity;
      todayPnl += (stock.close - stock.ltp) * stock.quantity;
    });
    const totalPnl = currentValue - investedValue;
    setPortfolio({currentValue, investedValue, todayPnl, totalPnl});
  }, [data]);

  const LoadingIndicator = useCallback(() => {
    return (
      <View style={styles.loadingWrapper}>
        {error ? <Text>{translate('something_went_wrong')}</Text> : null}
        {isLoading && (
          <ActivityIndicator
            size={'large'}
            animating={isLoading}
            color={THEME.colors.primary}
          />
        )}
      </View>
    );
  }, [isLoading, error]);

  return (
    <View style={styles.container}>
      <Header title={translate('upstox_holding')} />
      <FlatList
        onRefresh={fetchStockList}
        refreshing={isLoading}
        ListEmptyComponent={LoadingIndicator}
        data={data}
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
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.white,
    paddingVertical: 16,
  },
});
