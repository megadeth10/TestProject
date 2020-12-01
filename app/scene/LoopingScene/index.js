import React, {useRef, useState, useCallback, useEffect} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';

import Globals from '../../constance/Globals';
import LoopingViewPager from '../../component/view/pager/LoopingViewPager';
import SimpleTitleBar from '../../component/titlebar/SimpleTitleBar';

const IMAGE_1 = require('../../asset/image/pagerImage_1.png');
const IMAGE_2 = require('../../asset/image/pagerImage_2.png');
const IMAGE_3 = require('../../asset/image/pagerImage_3.png');

// roll 배너 애니메이션 stop
const stopPager = (pagersRef) => {
  if (pagersRef && Array.isArray(pagersRef)) {
    pagersRef.forEach((ele) => {
      if (ele && ele.current) {
        ele.current.onBlur();
      }
    });
  }
};

// roll 배너 애니메이션 start
const startPager = (pagersRef) => {
  if (pagersRef && Array.isArray(pagersRef)) {
    pagersRef.forEach((ele) => {
      if (ele && ele.current) {
        ele.current.onFocus();
      }
    });
  }
};

const LoopingScene = ({navigation}) => {
  const loopingPagerRef = useRef();
  const [imageList] = useState([IMAGE_1, IMAGE_2, IMAGE_3]);
  const blurUnsubscribeRef = useRef(undefined);
  const focusUnsubscribeRef = useRef(undefined);

  const onDidFocus = useCallback(() => {
    startPager([loopingPagerRef]);
  }, []);

  const onWillBlur = useCallback(() => {
    stopPager([loopingPagerRef]);
  }, []);

  useEffect(() => {
    blurUnsubscribeRef.current = navigation.addListener('blur', onWillBlur);
    focusUnsubscribeRef.current = navigation.addListener('focus', onDidFocus);
    return () => {
      if (blurUnsubscribeRef.current) {
        blurUnsubscribeRef.current();
      }
      if (focusUnsubscribeRef.current) {
        focusUnsubscribeRef.current();
      }
    };
  }, [navigation, onDidFocus, onWillBlur]);

  return (
    <View style={styles.rootView}>
      <SimpleTitleBar title="LoopingViewPager" navigation={navigation} />
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
