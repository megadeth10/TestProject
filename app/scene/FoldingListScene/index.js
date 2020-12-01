import React, {useRef, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Globals from '../../constance/Globals';
import SimpleTitleBar from '../../component/titlebar/SimpleTitleBar';
import FoldList from '../../component/list/FoldingList';

const LIST_ITEM = [
  {
    headerTitle: 'A그룹',
    item: [
      {
        itemName: 'Item1',
      },
      {
        itemName: 'Item2',
      },
      {
        itemName: 'Item3',
      },
    ],
  },
  {
    headerTitle: 'B그룹',
    item: [
      {
        itemName: 'ItemB-1',
      },
      {
        itemName: 'ItemB-2',
      },
      {
        itemName: 'ItemB-3',
      },
    ],
  },
];

const keyExtractor = ({index, item}) => {
  const {headerTitle} = item;
  return `${headerTitle}_${index}`;
};

const renderItem = ({item, index}) => {
  const {item: items = []} = item;
  const length = items?.length;
  return items.map((data, i) => {
    const {itemName} = data;
    const key = `${itemName}_${i}`;
    const borderView = i < length ? <View style={styles.dividerStyle} /> : null;
    return (
      <TouchableOpacity style={styles.itemStyle} key={key}>
        <Text style={styles.itemTextStyle}>{itemName}</Text>
        {borderView}
      </TouchableOpacity>
    );
  });
};

const renderHeader = ({item, index, foldState}) => {
  const {headerTitle} = item;
  const foldText = foldState ? '닫힘' : '열림';
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.headerText}>{headerTitle}</Text>
      <Text style={styles.headerText}>{foldText}</Text>
    </View>
  );
};

const ItemSeparatorComponent = () => <View style={styles.groupDividerStyle} />;

const FoldingListScene = ({navigation}) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.rootView}>
      <SimpleTitleBar title="Fold/UnFold List" navigation={navigation} />
      <FoldList
        style={styles.rootView}
        data={LIST_ITEM}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderFoldHeader={renderHeader}
        ItemSeparatorComponent={ItemSeparatorComponent}
        initialNumToRender={2}
        windowSize={6}
        updateCellsBatchingPeriod={60}
        maxToRenderPerBatch={6}
        bounces={false}
      />
    </View>
  );
};

export default FoldingListScene;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  headerStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d1d1d1',
  },
  headerText: {
    fontSize: 20,
    color: 'black',
  },
  groupDividerStyle: {
    width: '100%',
    height: 1,
    backgroundColor: '#ff0000',
  },
  itemStyle: {
    flexDirection: 'column',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#e1e1e1',
  },
  itemTextStyle: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 20,
    color: 'black',
    textAlignVertical: 'center',
  },
  dividerStyle: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: 'black',
  },
});
