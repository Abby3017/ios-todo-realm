import React, { Component } from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import CheckBox from './CheckBox';
import TodoService from './TodoService';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this.onCheckBoxPressed = this.onCheckBoxPressed.bind(this);
  }

  onCheckBoxPressed() {
    const { data } = this.props;
    TodoService.update(data, () => {
      data.completed = !data.completed;
    });

    this.props.onCompletedChange();
  }

  render() {
    const { data } = this.props;
    const color = data.completed ? '#C5C8C9' : '#000';
    const textDecorationLine = data.completed ? 'line-through' : 'none';
    return (
      <TouchableHighlight
        underlayColor="#eee"
        style={{
 paddingTop: 6, paddingBottom: 6, backgroundColor: '#F8F8F8', borderBottomWidth: 1, borderColor: '#eee',
}}
        {...this.props.sortHandlers}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox data={data} color={color} onCheckBoxPressed={this.onCheckBoxPressed} />
          <Text style={{ fontSize: 18, color, textDecorationLine }}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

ListViewItem.propTypes = {
  onCompletedChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    completedAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
  }),
  sortHandlers: PropTypes.shape({
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
  }),
};

ListViewItem.defaultProps = {
  data: {},
  sortHandlers: {},
};

module.exports = ListViewItem;
