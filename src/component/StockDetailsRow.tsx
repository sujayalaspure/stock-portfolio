import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {THEME} from '../utils/theme';
import {translate} from '../utils/translate';

type Props = {
  symbol: string;
  quantity: number;
  avgPrice: number;
  ltp: number;
  close?: number;
};

type InfoNPriceProps = {
  title: string;
  price: number | string;
};

const StockDetailsRow = ({symbol, quantity, avgPrice, ltp}: Props) => {
  const currentValue = ltp * quantity;
  const investedValue = avgPrice * quantity;
  const pnl = (currentValue - investedValue).toFixed(2);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
      <View>
        <InfoNPrice title={translate('ltp')} price={ltp} />
        <InfoNPrice title={translate('pnl')} price={pnl} />
      </View>
    </View>
  );
};

const InfoNPrice = ({title, price}: InfoNPriceProps) => {
  return (
    <View style={styles.infopriceWrapper}>
      <Text style={styles.title}>{title}:</Text>
      <Text style={styles.price}>₹ {price}</Text>
    </View>
  );
};

export default StockDetailsRow;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.lightGrey,
    backgroundColor: THEME.colors.white,
  },
  symbol: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quantity: {},
  infopriceWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 4,
  },
  title: {
    marginRight: 8,
  },
  price: {
    fontWeight: 'bold',
  },
});
