import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  VirtualizedList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PagerDotIndicator} from 'react-native-best-viewpager';

import PagerIndicator from '../indicator/PagerIndicator';

export default class LoopingViewPager extends PureComponent {
  static INDICATOR_TYPE_DOT = 'dot_type';

  constructor(props) {
    super(props);

    this.setCurrentIndex(this.getInitialIndex());
    this.listRef = React.createRef();
  }

  componentDidMount() {
    this.startAutoPlay();
  }

  componentWillUnmount() {
    this.stopAutoPlay();
  }

  getInitialIndex = () => {
    const groups = this.getDummyLength() / this.getRealLength();
    const midGroup = Math.floor(groups / 2);

    return midGroup * this.getRealLength();
  };

  getDummyLength = () => {
    const dummyScrollBase = Math.max(
      Math.min(this.getRealLength() * 10, Math.max(1500, this.getRealLength())),
      500,
    );
    return dummyScrollBase - (dummyScrollBase % this.getRealLength());
  };

  getRealLength = () => {
    const {imageList} = this.props;
    return imageList ? imageList.length : 0;
  };

  setCurrentIndex = (index) => {
    this.currentIndex = index;
  };

  getCurrentIndex = () => this.currentIndex;

  onBlur = () => {
    this.stopAutoPlay();
  };

  onFocus = () => {
    this.startAutoPlay();
  };

  goToNextPage = () => {
    if (this.listRef.current && this.listRef.current.scrollToIndex) {
      let nextPage = this.getCurrentIndex() + 1;
      let animated = true;
      if (nextPage >= this.getDummyLength()) {
        nextPage = this.getInitialIndex();
        animated = false;
      }
      this.listRef.current.scrollToIndex({index: nextPage, animated});
      if (!animated) {
        this.setCurrentIndex(nextPage);
        this.sendIndicator(nextPage);
      }
    }
  };

  sendIndicator = (index) => {
    const {showIndicator} = this.props;
    if (showIndicator) {
      const event = {position: this.getRealIndex(index)};
      this.pagerIndicatorRef.onPageSelected(event);
    }
  };

  getRealIndex = (index) => index % this.getRealLength();

  startAutoPlay = () => {
    if (this.rollTimer) return;
    const {imageList = [], enableAutoPlay, autoPlayInterval} = this.props;
    const {length} = imageList;
    if (enableAutoPlay && length > 1) {
      this.rollTimer = setInterval(this.goToNextPage, autoPlayInterval);
    }
  };

  stopAutoPlay = () => {
    if (this.rollTimer) {
      clearInterval(this.rollTimer);
      this.rollTimer = null;
    }
  };

  onScroll = (e) => {
    const {
      nativeEvent: {contentOffset},
    } = e;
    const viewSize = e.nativeEvent.layoutMeasurement;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = contentOffset.x / Math.floor(viewSize.width);
    const pNum = Math.round(pageNum);

    if (pNum !== this.currentIndex) {
      this.setCurrentIndex(pNum);
      this.sendIndicator(pNum);
    }
  };

  onPress = ({data, index}) => {
    const {onPress, imageList} = this.props;
    if (onPress) {
      const realIndex = index % imageList.length;
      onPress({data, index: realIndex});
    }
  };

  renderImageView = ({source, width, height, index, data, imageStyle}) => {
    const rStyle = [{width, height}, [imageStyle]];
    const onPressCallback = () => this.onPress({index, data});
    return (
      <TouchableOpacity
        style={rStyle}
        onPress={onPressCallback}
        // data={{index, data}}
      >
        <FastImage
          source={source}
          style={{width, height}}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
    );
  };

  renderItem = (info) => {
    const {imageList, width, height, data: dataArray, imageStyle} = this.props;
    const {index} = info;
    const realIndex = this.getRealIndex(index);
    const source = imageList[realIndex]; // {uri: imageList[realIndex]};
    const data = dataArray[realIndex];
    return this.renderImageView({
      source,
      width,
      height,
      index,
      data,
      imageStyle,
    });
  };

  renderDotIndicator = () => {
    const {indicatorStyle, imageList, dotStyle, selectedDotStyle} = this.props;
    const newIndicatorStyle = [styles.indicator, indicatorStyle];
    const newDotStyle = [baseDotStyle, dotStyle];

    const newSelectedDotStyle = [styles.selectedDotStyle, selectedDotStyle];
    return (
      <PagerDotIndicator
        ref={(refs) => {
          this.pagerIndicatorRef = refs;
        }}
        style={newIndicatorStyle}
        initialPage={0}
        pageCount={imageList.length}
        dotStyle={newDotStyle}
        selectedDotStyle={newSelectedDotStyle}
      />
    );
  };

  renderBarIndicator = () => {
    const {indicatorStyle, imageList} = this.props;
    const newIndicatorStyle = [styles.indicator, indicatorStyle];
    return (
      <PagerIndicator
        ref={(refs) => {
          this.pagerIndicatorRef = refs;
        }}
        count={imageList.length}
        style={newIndicatorStyle}
      />
    );
  };

  renderProgress = () => {
    const {indicatorType} = this.props;

    if (indicatorType === LoopingViewPager.INDICATOR_TYPE_DOT) {
      return this.renderDotIndicator();
    }
    return this.renderBarIndicator();
  };

  renderPager = () => {
    const {width, height, showIndicator} = this.props;

    const dummyData = {
      length: this.getDummyLength(),
    };

    return (
      <View style={styles.row}>
        <VirtualizedList
          ref={this.listRef}
          style={{width, height}}
          horizontal
          pagingEnabled
          initialNumToRender={3}
          getItemCount={(data) => data.length}
          data={dummyData}
          initialScrollIndex={this.getInitialIndex()}
          keyExtractor={(_item, index) => `${index}`}
          getItemLayout={(_data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          maxToRenderPerBatch={1}
          windowSize={3}
          getItem={(_data, index) => ({index})}
          renderItem={this.renderItem}
          showsHorizontalScrollIndicator={false}
          onScrollBeginDrag={this.stopAutoPlay}
          onScrollEndDrag={this.startAutoPlay}
          onScroll={this.onScroll}
          bounces={false}
          scrollEventThrottle={16}
        />
        {showIndicator && this.renderProgress()}
      </View>
    );
  };

  render() {
    const {imageList = [], width, height, data, imageStyle} = this.props;
    const {length} = imageList;

    if (length === 1) {
      const index = 0;
      const source = {uri: imageList[index]};
      return this.renderImageView({
        source,
        width,
        height,
        index,
        data: data[0],
        imageStyle,
      });
    }

    if (length > 1) {
      return this.renderPager();
    }

    return null;
  }
}

LoopingViewPager.propTypes = {
  imageList: PropTypes.array,
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  onPress: PropTypes.func,
  enableAutoPlay: PropTypes.bool,
  autoPlayInterval: PropTypes.number,
  showIndicator: PropTypes.bool,
  indicatorStyle: PropTypes.object,
  indicatorType: PropTypes.string,
  dotStyle: PropTypes.object,
  selectedDotStyle: PropTypes.object,
  imageStyle: PropTypes.object,
};

LoopingViewPager.defaultProps = {
  imageList: [],
  data: [],
  width: 0,
  height: 0,
  onPress: undefined,
  enableAutoPlay: false,
  autoPlayInterval: 5000,
  showIndicator: false,
  indicatorStyle: undefined,
  indicatorType: 'default',
  dotStyle: undefined,
  selectedDotStyle: undefined,
  imageStyle: undefined,
};

const baseDotStyle = {
  width: 8,
  height: 8,
  borderRadius: 4,
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
  selectedDotStyle: {
    ...baseDotStyle,
    backgroundColor: '#FCCD07',
  },
});
