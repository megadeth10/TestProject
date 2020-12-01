import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, ActivityIndicator, Platform} from 'react-native';

export default class ProgressBar extends PureComponent {
  static propTypes = {
    visible: PropTypes.bool,
    color: PropTypes.string,
    size: PropTypes.number,
  };

  static defaultProps = {
    visible: false,
    color: 'yellow',
    size: 50,
  };

  constructor(props) {
    super(props);
    this.isIos = Platform.OS === 'ios';
  }

  render() {
    const {style, visible, color, size, ...rest} = this.props;

    if (!visible) {
      return null;
    }

    const newStyle = [styles.rootView, style];
    const sizeProps = this.isIos ? 'large' : size;
    return (
      <View {...rest} style={newStyle}>
        <ActivityIndicator size={sizeProps} color={color} animating />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
