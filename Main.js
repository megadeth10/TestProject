import React, {Component} from 'react';

import RootNavigator from './app/navigator/RootNavigator';

export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  // 	this.rootStore.onAppDidMount();
  // 	AppState.addEventListener('change', this.onAppStateChange);
  // }

  // componentWillUnmount() {
  // 	this.rootStore.onAppWillUnmount();
  // 	AppState.removeEventListener('change', this.onAppStateChange);
  // 	this.rootStore = undefined;
  // }

  // onAppStateChange = (state) => {
  // 	this.rootStore.onAppStateChange(state);
  // };

  render() {
    return <RootNavigator />;
  }
}
