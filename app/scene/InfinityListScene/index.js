import React, {useRef, useCallback, useEffect} from 'react';
import {StyleSheet, View, RefreshControl, Text} from 'react-native';

import SimpleTitleBar from '../../component/titlebar/SimpleTitleBar';
import MoreDataList from '../../component/list/MoreDataList';

const ITEMS = [
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
  {
    itemName: 'ItemB-',
  },
];

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const InfinityListScene = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const listRef = useRef();
  useEffect(() => {
    return () => {};
  }, []);

  const renderItem = useCallback((params) => {
    const {
      item: {itemName},
      index,
    } = params;
    const text = `${itemName}${index}`;
    return (
      <View style={styles.itemStyle}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    );
  }, []);

  const addListData = useCallback(async (params) => {
    return Promise.resolve({data: ITEMS});
  }, []);

  const getData = useCallback(async () => {
    await wait(2000);
    return {data: ITEMS};
  }, []);

  const resetListData = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
      listRef.current?.resetData();
    });
  }, []);

  const renderRefreshControl = useCallback(() => {
    return <RefreshControl refreshing={refreshing} onRefresh={resetListData} />;
  }, [refreshing, resetListData]);

  return (
    <View style={styles.rootView}>
      <SimpleTitleBar title="infinity List" navigation={navigation} />
      <MoreDataList
        ref={listRef}
        style={styles.rootView}
        startPageNumber={0}
        renderItem={renderItem}
        getData={getData}
        refreshControl={renderRefreshControl()}
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
