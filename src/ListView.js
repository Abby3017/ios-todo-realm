import React, { Component } from 'react';
import { View } from 'react-native';
import SortableListView from 'react-native-sortable-listview';
import OmniBox from './OmniBox';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import TodoService from './TodoService';


function getOrder(list) {
  console.log(list)
  return Object.keys(list);
}

const dataList = TodoService.findAll();
let dataListOrder = getOrder(dataList);

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex, 10), parseInt(toIndex, 10));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
  constructor(props) {
    super(props);
    this.updateDataList = this.updateDataList.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this.state = {
      dataList: dataList,
    };
  }

  updateDataList(dataList) {
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList,
    });
  }

  _onCompletedChange() {
    if (this.forceUpdate) this.forceUpdate();
  }

  listDisplayView() {
    console.log(this.state.dataList);
    if (this.state.dataList.length) {
      return (<SortableListView
        style={{ flex: 1 }}
        data={this.state.dataList}
        order={dataListOrder}
        onRowMoved={e => moveOrderItem(this, e.from, e.to)}
        renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} onCompletedChange={this._onCompletedChange} />}
      />);
    }
    return <View />;
  }

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <OmniBox
          data={Array.from(dataList)}
          updateDataList={this.updateDataList}
        />
        {this.listDisplayView()}
      </View>
    );
  }
}

module.exports = ListView;
