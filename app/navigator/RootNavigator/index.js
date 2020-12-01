import React, {Component} from 'react';
import {View, StyleSheet, Animated, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScene from '../../scene/MainScene';
import LoopingScene from '../../scene/LoopingScene';

const getDefaultScreenProps = (name, component, extraProps = {}) => (
  <Stack.Screen name={name} component={component} {...extraProps} />
);

const Stack = createStackNavigator();

const RootStackNavigator = () => (
  <Stack.Navigator
    initialRouteName="MainScene"
    mode="card"
    headerMode="none"
    cardStyle={styles.rootView}
    // screenOptions={({route}) => {
    //   const gestureEnabled = route?.params?.params?.gestureEnabled;
    //   return {
    //     gestureEnabled:
    //       gestureEnabled === undefined ? defaultGestureEnabled : gestureEnabled,
    //     header: null,
    //   };
    // }}
  >
    {getDefaultScreenProps('MainScene', MainScene)}
    {getDefaultScreenProps('LoopingScene', LoopingScene)}
  </Stack.Navigator>
);

export default () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    backgroundColor: 'white',
  },
});
