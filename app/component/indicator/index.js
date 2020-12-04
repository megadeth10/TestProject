import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated, Easing} from 'react-native';
import RN from 'react-native/package';

const [major, minor] = RN.version.split('.').map((item) => Number(item));
const hasLoopSupport = !major && minor >= 45;

export default class Indicator extends PureComponent {
  static propTypes = {
    animationEasing: PropTypes.func,
    animationDuration: PropTypes.number,
    animating: PropTypes.bool,
    interaction: PropTypes.bool,
    renderComponent: PropTypes.func,
    count: PropTypes.number,
    useNativeDriver: PropTypes.bool,
  };

  static defaultProps = {
    animationEasing: Easing.linear,
    animationDuration: 1200,
    animating: true,
    interaction: true,
    renderComponent: undefined,
    count: 1,
    useNativeDriver: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: new Animated.Value(0),
    };

    this.mounted = false;
  }

  componentDidMount() {
    const {animating} = this.props;

    this.mounted = true;

    if (animating) {
      this.startAnimation();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {animating} = this.props;
    if (animating !== prevProps.animating) {
      if (animating) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  startAnimation = ({finished} = {}) => {
    const {progress} = this.state;
    const {
      interaction,
      animationEasing,
      animationDuration,
      useNativeDriver,
    } = this.props;

    if (!this.mounted || finished === false) {
      return;
    }

    const animation = Animated.timing(progress, {
      duration: animationDuration,
      easing: animationEasing,
      useNativeDriver,
      isInteraction: interaction,
      toValue: 1,
    });

    if (hasLoopSupport) {
      Animated.loop(animation).start();
    } else {
      progress.setValue(0);
      animation.start(this.startAnimation);
    }

    this.setState({animation});
  };

  stopAnimation = () => {
    const {animation} = this.state;

    if (animation === null) {
      return;
    }

    animation.stop();

    this.setState({animation: null});
  };

  renderComponent = (_undefined, index) => {
    const {progress} = this.state;
    const {renderComponent, count} = this.props;

    if (typeof renderComponent === 'function') {
      return renderComponent({index, count, progress});
    }
    return null;
  };

  render() {
    const {count, ...props} = this.props;

    return (
      <Animated.View {...props}>
        {Array.from(new Array(count), this.renderComponent)}
      </Animated.View>
    );
  }
}
