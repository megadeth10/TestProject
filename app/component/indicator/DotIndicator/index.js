import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, StyleSheet} from 'react-native';

import Indicator from '../../indicator';

/**
 * reference https://github.com/n4kz/react-native-indicators
 */
export default class DotIndicator extends PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    count: PropTypes.number,
  };

  static defaultProps = {
    color: 'rgb(0, 0, 0)',
    count: 3,
    size: 16,
  };

  constructor(props) {
    super(props);

    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent({index, count, progress}) {
    let {size} = this.props;
    const {style, animating} = this.props;

    if (!animating) {
      return null;
    }

    if (style.width) {
      size = style.width / (count * 4);
    }

    const colorArray = ['#d8d8d8', '#c2c2c2', '#9f9f9f'];

    const color = progress.interpolate({
      inputRange: [0.0, 0.25, 0.4, 0.5, 0.75, 0.8, 1.0],
      outputRange: [
        colorArray[index % count],
        colorArray[(index + 1) % count],
        colorArray[(index + 2) % count],
        colorArray[(index + 3) % count],
        colorArray[(index + 4) % count],
        colorArray[(index + 5) % count],
        colorArray[(index + 6) % count],
      ],
    });

    const rstyle = {
      width: size,
      height: size,
      marginLeft: size / 2,
      marginRight: size / 2,
      borderRadius: size / 2,
      backgroundColor: color,
    };

    return <Animated.View style={rstyle} {...{key: index}} />;
  }

  render() {
    const {style, ...rest} = this.props;

    return (
      <Indicator
        style={[styles.container, style]}
        renderComponent={this.renderComponent}
        {...rest}
        useNativeDriver={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
