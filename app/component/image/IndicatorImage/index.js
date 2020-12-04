import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import DotIndicator from '../../indicator/DotIndicator';
import {checkImageSource} from '../../../util';

export default class IndicatorImage extends Component {
  static propTypes = {
    defaultImage: PropTypes.bool,
    source: PropTypes.object,
    resizeMode: PropTypes.string,
    showIndicator: PropTypes.bool,
  };

  static defaultProps = {
    defaultImage: false,
    source: undefined,
    resizeMode: undefined,
    showIndicator: true,
  };

  isError = false;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  onLoadStart = () => {
    this.isError = false;

    this.setState(() => ({isLoading: true}));
  };

  onLoadEnd = () => {
    if (this.isError === false) {
      this.setState(() => ({isLoading: false}));
    }
  };

  onError = () => {
    this.isError = true;
  };

  renderIndicator = () => {
    const {showIndicator, style, defaultWidth, defaultImage} = this.props;
    const {isLoading} = this.state;
    if (!(isLoading && defaultImage)) {
      return null;
    }
    const dStyle = {
      ...style,
      position: 'absolute',
      flexDirection: 'row',
      width: defaultWidth,
      backgroundColor: '#f1f1f1',
    };
    return (
      <DotIndicator
        style={dStyle}
        color="#d1d1d1"
        animationDuration={3000}
        animating={showIndicator}
      />
    );
  };

  render() {
    const {defaultImage, style, source, resizeMode} = this.props;
    const s = checkImageSource(source);
    const fastImageResizeMode = resizeMode
      ? FastImage.resizeMode[resizeMode]
      : undefined;

    return (
      <View style={style}>
        <FastImage
          {...this.props}
          source={s}
          onLoadStart={defaultImage ? this.onLoadStart : undefined}
          onLoadEnd={defaultImage ? this.onLoadEnd : undefined}
          onError={defaultImage ? this.onError : undefined}
          resizeMode={fastImageResizeMode}
        />
        {this.renderIndicator()}
      </View>
    );
  }
}
