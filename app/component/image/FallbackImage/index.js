import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {checkImageSource} from '../../../util';

export default class FallbackImage extends Component {
  static propTypes = {
    resizeMode: PropTypes.string,
  };

  static defaultProps = {
    resizeMode: undefined,
  };

  static getDerivedStateFromProps(prevState, props) {
    const {prevSource} = prevState;
    const {source} = props;
    if (prevSource !== source) {
      const prevUri = prevSource && prevSource.uri ? prevSource.uri : undefined;
      const uri = source && source.uri ? source.uri : undefined;

      if (
        uri !== prevUri ||
        !Number.isNaN(prevSource) ||
        !Number.isNaN(source)
      ) {
        return {prevSource: source, error: false};
      }
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      prevSource: props.source,
    };
  }

  onError = () => {
    const {onError} = this.props;
    const {error} = this.state;

    if (onError) {
      onError();
    }

    if (error) {
      return;
    }

    this.setState({error: true});
  };

  render() {
    const {source, resizeMode, onError, defaultSource, ...rest} = this.props;
    const {error} = this.state;
    let newSource;
    if (error) {
      newSource = defaultSource;
    } else {
      newSource = checkImageSource(source);
    }
    const fastImageResizeMode = resizeMode
      ? FastImage.resizeMode[resizeMode]
      : undefined;

    return (
      <FastImage
        {...rest}
        source={newSource}
        onError={this.onError}
        resizeMode={fastImageResizeMode}
      />
    );
  }
}
