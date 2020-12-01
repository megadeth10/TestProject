import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import PropTypes from 'prop-types';

const setFoldingState = ({data, prevState = undefined}) => {
  let nextStateArray = Array.from({length: data?.length || 0}, () => true);
  if (prevState) {
    nextStateArray = nextStateArray.map((item, index) => {
      let nextState = item;
      let prevData;
      try {
        prevData = prevState[index];
      } catch (error) {
        console.log('wrong index');
        prevData = undefined;
      }
      if (prevData !== undefined) {
        nextState = nextState && prevData;
      }
      return nextState;
    });
  }
  return nextStateArray;
};

const FoldingList = ({
  data,
  initFoldIndex,
  renderFoldHeader,
  renderItem,
  extraData,
  ...rest
}) => {
  const [itemData, setItemData] = useState(undefined);
  const [foldStateArray, setFoldStateArray] = useState(undefined);

  useEffect(() => {
    const nextStateArray = setFoldingState({
      data,
      prevState: foldStateArray,
    });
    setFoldStateArray(nextStateArray);
    setItemData(data);
  }, [data, initFoldIndex]);

  const onPressFoldHeader = useCallback(
    ({foldState, index}) => {
      try {
        foldStateArray[index] = !foldState;
        setFoldStateArray(foldStateArray.slice(0));
      } catch (error) {
        console.log('onPressFoldHeader wrong index');
      }
    },
    [foldStateArray],
  );

  const renderHeader = useCallback(
    (params) => {
      const {foldState, index} = params;
      const onPress = () => onPressFoldHeader({foldState, index});
      return (
        <TouchableOpacity onPress={onPress}>
          {renderFoldHeader(params)}
        </TouchableOpacity>
      );
    },
    [onPressFoldHeader, renderFoldHeader],
  );

  const renderFoldItem = useCallback(
    (params) => {
      let foldState = false;
      try {
        const {index} = params;
        foldState = foldStateArray[index];
      } catch (error) {
        foldState = undefined;
      }
      let foldingView;
      if (renderItem && foldState) {
        foldingView = renderItem({...params, foldState});
      }
      return (
        <>
          {renderHeader({...params, foldState})}
          {foldingView}
        </>
      );
    },
    [foldStateArray, renderHeader, renderItem],
  );

  return (
    <FlatList
      {...rest}
      data={itemData}
      renderItem={renderFoldItem}
      extraData={{...extraData, foldStateArray}}
    />
  );
};

FoldingList.propTypes = {
  data: PropTypes.array,
  initFoldIndex: PropTypes.array,
  renderFoldHeader: PropTypes.func,
  extraData: PropTypes.object,
  renderItem: PropTypes.func,
};

FoldingList.defaultProps = {
  data: undefined,
  initFoldIndex: undefined,
  renderFoldHeader: undefined,
  extraData: {},
  renderItem: undefined,
};

export default FoldingList;
