import React, {useRef, useState, useCallback, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const SimpleTitleBar = ({
  title,
  titleStyle,
  style,
  navigation,
  onPressBack,
}) => {
  const [text, setText] = useState(title);

  useEffect(() => {
    setText(title);
  }, [title]);

  const onPress = useCallback(() => {
    if (onPressBack != null) {
      onPressBack();
      return;
    }
    navigation?.pop();
  }, [navigation, onPressBack]);

  const textStyle = useMemo(() => [titleStyle, styles.titleStyle], [
    titleStyle,
  ]);
  const rootStyle = useMemo(() => [style, styles.rootView], [style]);
  return (
    <View style={rootStyle}>
      <TouchableOpacity style={styles.backButtonStyle} onPress={onPress}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

export default SimpleTitleBar;

SimpleTitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired,
  onPressBack: PropTypes.func,
  titleStyle: PropTypes.object,
  style: PropTypes.object,
};

SimpleTitleBar.defaultProps = {
  onPressBack: undefined,
  titleStyle: {},
  style: {},
};

const HEIGHT = 50;

const styles = StyleSheet.create({
  rootView: {
    width: Dimensions.get('screen').width,
    height: HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
  },
  titleStyle: {
    fontSize: 15,
    color: 'black',
  },
  backButtonStyle: {
    width: HEIGHT,
    height: HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
