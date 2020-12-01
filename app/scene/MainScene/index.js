import React, {useCallback} from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const BUTTON_DATA = [
  {
    title: 'LoopingViewPager',
    sceneName: 'LoopingScene',
  },
  {
    title: 'FoldingList',
    sceneName: 'FoldingListScene',
  },
  {
    title: 'Width Pager',
    sceneName: 'WidthPagerScene',
  },
  {
    title: 'Infinity List',
    sceneName: 'InfinityListScene',
  },
];

const keyExtractor = ({index, title}) => `${title}_${index}`;
const ItemSeparatorComponent = () => <View style={styles.dividerStyle} />;

const MainScene = ({navigation}) => {
  const onPress = useCallback(
    (sceneName) => {
      navigation.navigate(sceneName);
    },
    [navigation],
  );

  const makeButton = useCallback(
    ({item}) => {
      const {title, sceneName} = item;
      console.log('makeButton', {item});
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress(sceneName)}>
          <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
      );
    },
    [onPress],
  );

  return (
    <SafeAreaView style={styles.rootView}>
      <FlatList
        style={styles.listStyle}
        data={BUTTON_DATA}
        renderItem={makeButton}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </SafeAreaView>
  );
};

export default MainScene;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  listStyle: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#aaaaaa',
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
  },
  dividerStyle: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },
});
