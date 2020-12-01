import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import PropTypes from 'prop-types';

import Progress from '../../progress/ProgressBar';

export default class MoreDataList extends Component {
  static propTypes = {
    itemPerPage: PropTypes.number,
    getData: PropTypes.func,
    upperView: PropTypes.element,
    startPageNumber: PropTypes.number,
  };

  static defaultProps = {
    itemPerPage: 10,
    getData: undefined,
    upperView: undefined,
    startPageNumber: 0,
  };

  constructor(props) {
    super(props);

    const {itemPerPage, startPageNumber} = props;
    this.pageNumber = startPageNumber;
    this.itemPerPage = itemPerPage;

    this.state = {
      list: [],
      isMoreItem: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getListData = () => {
    const {list} = this.state;
    return list || [];
  };

  setListData = ({list}) => {
    if (list) {
      this.setState({list: [...list]});
    }
  };

  resetData = () => {
    const {startPageNumber} = this.props;
    this.pageNumber = startPageNumber;
    this.isGetData = false;
    this.state = {
      list: [],
      isMoreItem: false,
    };
  };

  keyExtractor = (item, index) => `MoreDataListItem_${index}`;

  renderItemSeparator = () => <View style={styles.itemSeparator} />;

  renderFooter = () => (
    <Progress style={styles.footerProgressLayout} size={30} visible />
  );

  onEndReached = () => {
    if (this.isGetData) {
      return;
    }

    this.getData();
  };

  getData = async () => {
    this.isGetData = true;
    const {getData} = this.props;
    let result;

    if (getData) {
      result = await getData({pageNumber: this.pageNumber});
      this.pageNumber += 1;
      this.setData(result);
    }
  };

  setData = (result) => {
    if (result && result.error) {
      return;
    }
    const {data} = result;
    const {list} = this.state;
    this.setState(
      {
        list: list.concat(data),
        isMoreItem: !(data.length < this.itemPerPage),
      },
      () => {
        this.isGetData = false;
      },
    );
  };

  render() {
    const {list, isMoreItem} = this.state;
    const {upperView, ...rest} = this.props;
    return (
      <View style={styles.rootView}>
        {list.length > 0 && upperView}
        <FlatList
          data={list}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderItemSeparator}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={isMoreItem && this.renderFooter}
          onEndReached={isMoreItem && this.onEndReached}
          onEndReachedThreshold={0.5}
          {...rest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
    flexDirection: 'column',
  },
  listContainer: {
    flexGrow: 1,
    marginLeft: 23,
    marginRight: 23,
  },
  itemSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: '#e1e1e1',
  },
  footerProgressLayout: {
    height: 50,
  },
});
