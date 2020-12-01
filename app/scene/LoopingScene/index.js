import React, {useRef, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import Globals from '../../constance/Globals';
import LoopingViewPager from '../../component/view/pager/LoopingViewPager';

const IMAGE_1 = require('../../asset/image/pagerImage_1.png');
const IMAGE_2 = require('../../asset/image/pagerImage_2.png');
const IMAGE_3 = require('../../asset/image/pagerImage_3.png');

const LoopingScene = ({navigation}) => {
  const loopingPagerRef = useRef();
  const [imageList, setImageList] = useState([IMAGE_1, IMAGE_2, IMAGE_3]);
  return (
    <View style={styles.rootView}>
      <LoopingViewPager
        ref={(refs) => {
          loopingPagerRef.current = refs;
        }}
        width={Dimensions.get('screen').width}
        height={200}
        imageList={imageList}
        // data={mainBannerData}
        // onPress={}
        autoPlayInterval={Globals.IMAGE_PAGER_INTERVAL_TIMES}
        enableAutoPlay
        // indicatorStyle={indicatorStyle}
        showIndicator
        indicatorType={LoopingViewPager.INDICATOR_TYPE_DOT}
        dotStyle={styles.dotStyle}
        selectedDotStyle={styles.selectedDotStyle}
        // imageStyle={styles.imageStyle}
      />
    </View>
  );
};

export default LoopingScene;

const dotStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: 'black',
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  dotStyle: {
    ...dotStyle,
  },
  selectedDotStyle: {
    ...dotStyle,
    backgroundColor: 'gray',
  },
});
