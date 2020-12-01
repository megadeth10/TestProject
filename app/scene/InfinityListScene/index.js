import React, {useRef, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';

import Globals from '../../constance/Globals';
import SimpleTitleBar from '../../component/titlebar/SimpleTitleBar';
import MoreDataList from '../../component/list/MoreDataList';

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
  {
    itemName: 'ItemB-4',
  },
  {
    itemName: 'ItemB-5',
  },
  {
    itemName: 'ItemB-6',
  },
  {
    itemName: 'ItemB-7',
  },
  {
    itemName: 'ItemB-8',
  },
  {
    itemName: 'ItemB-9',
  },
  {
    itemName: 'ItemB-10',
  },
];
const InfinityListScene = ({navigation}) => {
  useEffect(() => {
    return () => {};
  }, []);

  const renderItem = useCallback((params) => {
    const {
      item: {itemName},
    } = params;
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.textStyle}>{itemName}</Text>
      </View>
    );
  }, []);

  const addListData = useCallback(async (params) => {
    return Promise.resolve({data: ITEMS});
  }, []);

  return (
    <View style={styles.rootView}>
      <SimpleTitleBar title="infinity List" navigation={navigation} />
      <MoreDataList
        style={styles.rootView}
        startPageNumber={0}
        renderItem={renderItem}
        getData={addListData}
      />
    </View>
  );
};

export default InfinityListScene;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  itemStyle: {
    flexDirection: 'column',
    width: '100%',
    height: 70,
    justifyContent: 'center',
    backgroundColor: '#e1e1e1',
  },
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
});
