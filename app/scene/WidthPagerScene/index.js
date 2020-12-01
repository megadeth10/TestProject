import React, {useRef, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';

import Globals from '../../constance/Globals';
import SimpleTitleBar from '../../component/titlebar/SimpleTitleBar';
import CustomWidthPager from '../../component/view/pager/CustomWidthPager';

const ITEMS = [
  {
    itemName: 'ItemB-1',
  },
  {
    itemName: 'ItemB-2',
  },
  {
    itemName: 'ItemB-3',
  },
];
const WidthPagerScene = ({navigation}) => {
  useEffect(() => {
    return () => {};
  }, []);

  const renderItem = useCallback((params) => {
    const {
      item: {
        item: {itemName},
      },
      index,
      itemsLength,
      style: iStyle,
    } = params;
    return (
      <View
        style={[
          {
            backgroundColor: '#ff0000',
            height: 150,
          },
          iStyle,
        ]}>
        <Text style={styles.textStyle}>{itemName}</Text>
      </View>
    );
  }, []);

  return (
    <View style={styles.rootView}>
      <SimpleTitleBar title="Width Pager" navigation={navigation} />
      <CustomWidthPager
        style={styles.bestLayout}
        data={ITEMS}
        renderItem={renderItem}
        itemStyle={styles.listItemLayout}
        listFooterStyle={styles.listFooter}
        listDividerStyle={styles.listDivider}
        containerStyle={styles.listContainer}
        contentContainerStyle={styles.listContainer}
        bounces={false}
        initialIndex={0}
      />
    </View>
  );
};

export default WidthPagerScene;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  bestLayout: {
    width: Dimensions.get('screen').width,
    height: 150,
  },
  listItemLayout: {
    flex: 1,
    width: 320,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  listDivider: {
    flex: 1,
    width: 14,
  },
  listFooter: {
    flex: 1,
    width: 18,
  },
  listItemTouchableArea: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
});
