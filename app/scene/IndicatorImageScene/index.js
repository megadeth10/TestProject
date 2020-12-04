import React, {useEffect} from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';

import SimpleTitleBar from '../../component/titlebar/SimpleTitleBar';
import IndicatorImage from '../../component/image/IndicatorImage';
import FallbackImage from '../../component/image/FallbackImage';

const DEFAULT_IMAGE = require('../../asset/image/pagerImage_1.png');

const IndicatorImageScene = ({navigation}) => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View style={styles.rootView}>
      <SimpleTitleBar title="Loading Image" navigation={navigation} />
      <Text style={styles.textStyle}>Indicator Image</Text>
      <IndicatorImage
        style={styles.imageStyle}
        defaultWidth={Dimensions.get('screen').width}
        defaultImage
        source={{uri: 'https://aaa.com/aadsafasdfasdf'}}
        showIndicator
      />
      <Text style={styles.textStyle}>Fallback Image</Text>
      <FallbackImage
        style={styles.imageStyle}
        defaultSource={DEFAULT_IMAGE}
        source={{uri: 'https://aaa.com/aadsafasdfasdf'}}
      />
    </View>
  );
};

export default IndicatorImageScene;

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  imageStyle: {
    width: Dimensions.get('screen').width,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  textStyle: {
    height: 30,
    fontSize: 20,
    backgroundColor: '#a1a1a1',
  },
});
