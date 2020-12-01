import React, {useRef} from 'react';
import {View, Platform, FlatList, Dimensions} from 'react-native';

const keyExtractor = (item, index) => `CustomWidthPager${index}`;

const listFooterComponent = (style) => <View style={style} />;

const getItemLayout = (params) => {
  const {index, itemWidth} = params;
  return {
    length: itemWidth,
    offset: itemWidth * index,
    index,
  };
};

const isLegitIndex = (params) => {
  const {index, length} = params;
  if (index < 0 || index >= length) return false;
  return true;
};

const startDrag = (params) => {
  const {
    nativeEvent: {
      contentOffset: {x: scrollX},
    },
  } = params;
  PRESS_POSITION_X = scrollX;
  console.log('startDrag', {scrollX});
};

const goIndex = (params) => {
  const {nextIndex, length, listRef} = params;
  if (isLegitIndex({index: nextIndex, length})) {
    INDEX = nextIndex;
  }
  listRef.current.scrollToIndex({index: INDEX, animated: true});
};

const pagination = (params) => {
  const {
    e: {
      nativeEvent: {
        velocity: {x: velocity},
        contentOffset: {x: scrollX},
      },
    },
    length,
    listRef,
    itemWidth,
  } = params;
  let nextIndex;
  let isLeft = false;
  if (velocity === 0) {
    console.log('pagination', {velocity, scrollX});
    // IOS에서 가속도가 0이 들어온다. 0이 들어오면 움직인 거리로 계산한다.
    if (Math.abs(PRESS_POSITION_X - scrollX) < itemWidth / 2) {
      goIndex({nextIndex: INDEX, length, listRef});
      return;
    }
    if (PRESS_POSITION_X - scrollX > 0) {
      isLeft = true;
    } else {
      isLeft = false;
    }
  } else if (Platform.OS === 'ios') {
    isLeft = !(velocity > 0);
  } else {
    isLeft = !(velocity < 0);
  }

  if (isLeft) {
    nextIndex = INDEX - 1;
  } else {
    nextIndex = INDEX + 1;
  }

  goIndex({nextIndex, length, listRef});
};
let PRESS_POSITION_X = 0;
let INDEX = 0;

const CustomWidthPager = (params) => {
  const {
    style,
    data,
    renderItem,
    itemStyle,
    listFooterStyle,
    listDividerStyle,
    initialIndex,
    ...rest
  } = params;
  INDEX = initialIndex;
  const listRef = useRef(React.createRef());

  const iStyle = {...itemStyle};
  const headerStyle = {...listFooterStyle};
  headerStyle.width = listFooterStyle.width + listDividerStyle.width;
  iStyle.width = Dimensions.get('screen').width - headerStyle.width * 2;
  const itemsLength = data.length;
  return (
    <FlatList
      ref={(refs) => {
        listRef.current = refs;
      }}
      style={style}
      data={data}
      renderItem={(item, index) =>
        renderItem({
          item,
          index,
          itemsLength,
          style: iStyle,
        })
      }
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => listFooterComponent(listDividerStyle)}
      ListFooterComponent={() => listFooterComponent(headerStyle)}
      ListHeaderComponent={() => listFooterComponent(headerStyle)}
      getItemLayout={(d, index) =>
        getItemLayout({
          d,
          index,
          itemWidth: iStyle.width + listDividerStyle.width,
        })
      }
      onScrollBeginDrag={startDrag}
      onScrollEndDrag={(e) =>
        pagination({
          e,
          length: itemsLength,
          listRef,
          itemWidth: iStyle.width + listDividerStyle.width,
        })
      }
      windowSize={2}
      maxToRenderPerBatch={3}
      initialScrollIndex={INDEX}
      horizontal
      {...rest}
    />
  );
};

CustomWidthPager.propTypes = {};

CustomWidthPager.defaultProps = {};

export default CustomWidthPager;
