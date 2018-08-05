import React, { Component } from 'react';
import { TextInput } from 'react-native';
import PropTypes from 'prop-types';

import TodoModel from './TodoModel';
import TodoService from './TodoService';
import Utils from './Utils';
import { debounceFn } from './helper/Util';

class OmniBox extends Component {
  constructor(props) {
    super(props);
    this.state = { newValue: '' };
    this.onChange = this.onChange.bind(this);
    this.onSubmitEditing = this.onSubmitEditing.bind(this);
  }

  onChange(event) {
    const title = event.nativeEvent.text;
    debounceFn(this.onChangeCallback(title), 500, this);
    // debounce(() => { For learning purpose, why sending text to arrow function failed and inside function call doesn't happene
    //   const dataList = this.props.data.filter(item => item.title.match(new RegExp(`.*${title}.*`, 'gi')));
    //   this.setState({
    //     newValue: title,
    //   });
    //   this.props.updateDataList(dataList);
    // }, 500);
    // const dataList = this.props.data.filter(item => item.title.match(new RegExp(`.*${title}.*`, 'gi')));
    // this.setState({
    //   newValue: title,
    // });
    // this.props.updateDataList(dataList);
  }

  onSubmitEditing() {
    if (this.state.newValue === '') {
      return;
    }
    const newDataItem = new TodoModel(this.state.newValue);
    const dataList = this.props.data;
    const dataItem = Utils.findTodo(newDataItem, dataList);
    if (dataItem) {
      Utils.move(dataList, (dataList.indexOf(dataItem)), 0);

      this.setState({
        newValue: '',
      });
      this.props.updateDataList(dataList);
      return;
    }

    dataList.unshift(newDataItem);
    TodoService.save(newDataItem);

    this.setState({
      newValue: '',
    });
    this.props.updateDataList(dataList);
  }

  onChangeCallback(title) {
    const dataList = this.props.data.filter(item => item.title.match(new RegExp(`.*${title}.*`, 'gi')));
    this.setState({
      newValue: title,
    });
    this.props.updateDataList(dataList);
  }

  render() {
    return (
      <TextInput
        style={{
height: 36, padding: 4, marginBottom: 0, fontSize: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8, backgroundColor: '#fff',
}}
        placeholder="Add a todo or Search"
        blurOnSubmit={false}
        value={this.state.newValue}
        // onChange={debounce((event) => {
        //     // event.persist();
        //     console.log(event);
        //     this.onChange(event.target.value);
        //   }, 500)}
        onChange={this.onChange}
        onSubmitEditing={this.onSubmitEditing}
      />
    );
  }
}

OmniBox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    completedAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
  })),
  updateDataList: PropTypes.func,
};

OmniBox.defaultProps = {
  data: () => {},
  updateDataList: () => {},
};

module.exports = OmniBox;
