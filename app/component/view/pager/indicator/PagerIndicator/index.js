import React, {Component} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

/**
 * reference : react-native-awesome-viewpager
 * only used IndicatorViewPager in react-native-best-viewpager module
 */

export default class PagerIndicator extends Component {
  constructor(props) {
    super(props);
    const {initialPage} = props;
    this.scrollValue = new Animated.Value(initialPage);
  }

  onPageSelected = (event) => {
    const page = event.position;
    this.scrollValue.setValue(page);
  };

  renderIndicator(width) {
    const {count, style} = this.props;
    const propsStyle = Array.isArray(style) ? style[1] : style;
    const indicatorStyle = {
      backgroundColor: propsStyle.backgroundColor || '#000',
      height: '100%',
      width: Math.floor(width / count),
    };
    const views = new Array(count);
    for (let i = 0; i < views.length; i += 1) {
      let opacity;
      if (i === 0) {
        opacity = this.scrollValue.interpolate({
          inputRange: [0, 1, count - 1, count],
          outputRange: [1, 0.2, 0.2, 1],
        });
      } else {
        opacity = this.scrollValue.interpolate({
          inputRange: [-Infinity, i - 1, i, i + 1, Infinity],
          outputRange: [0.2, 0.2, 1, 0.2, 0.2],
        });
      }

      views[i] = (
        <Animated.View
          key={i.toString()}
          style={{...indicatorStyle, opacity}}
        />
      );
    }

    return views;
  }

  render() {
    const {style} = this.props;
    const rootStyle = [styles.root, style];
    rootStyle.push({backgroundColor: 'transparent'});
    let {width} = styles.root;

    if (style && style.width) {
      const {width: styleWidth} = style;
      width = styleWidth;
    }
    return <View style={rootStyle}>{this.renderIndicator(width)}</View>;
  }
}

PagerIndicator.propTypes = {
  initialPage: PropTypes.number,
  count: PropTypes.number,
};

PagerIndicator.defaultProps = {
  initialPage: 0,
  count: 0,
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: Math.floor(72),
    height: 4,
  },
});
