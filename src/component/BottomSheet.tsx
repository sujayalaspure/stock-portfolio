import {View, StyleSheet, Text, Animated, Pressable} from 'react-native';
import React, {useRef} from 'react';
import {translate} from '../utils/translate';
import {THEME} from '../utils/theme';

type Props = {
  currentValue: number;
  investedValue: number;
  todayPnl: number;
  totalPnl: number;
};

const BottomSheet = ({
  currentValue,
  investedValue,
  todayPnl,
  totalPnl,
}: Props) => {
  const maxHeight = useRef(new Animated.Value(0)).current;

  const toggleVisible = () => {
    // maxHeight is of type Animated.Value so we can't directly compare it with a number.
    const toValue =
      Number.parseInt(JSON.stringify(maxHeight), 10) === 0 ? 200 : 0;

    Animated.spring(maxHeight, {
      toValue,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleVisible} style={styles.topBar}>
        <View style={styles.line} />
      </Pressable>
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.expandedContent,
            {
              maxHeight,
              opacity: maxHeight.interpolate({
                inputRange: [50, 100],
                outputRange: [0, 1],
              }),
            },
          ]}>
          <ContentRow title={translate('current_value')} value={currentValue} />
          <ContentRow
            title={translate('total_inversted_value')}
            value={investedValue}
          />
          <ContentRow title={translate('todays_pnl')} value={todayPnl} />
        </Animated.View>
        <ContentRow title={translate('profit_and_loss')} value={totalPnl} />
      </View>
    </View>
  );
};

const ContentRow = ({title, value}: {title: string; value: number}) => {
  return (
    <View style={styles.contentRow}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>₹ {value.toFixed(2)}</Text>
    </View>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: THEME.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  line: {
    height: 8,
    width: 80,
    backgroundColor: 'grey',
    borderRadius: 4,
  },
  content: {
    paddingHorizontal: 16,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  value: {},
  expandedContent: {
    marginBottom: 20,
  },
});
