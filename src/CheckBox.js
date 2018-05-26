import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,    //  check this
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data, // check this
    });
  }

  render() {
    const iconName = this.state.data.completed ? 'check-box' : 'check-box-outline-blank';
    const color = this.props.color || '#000';

    return (
      <Icon.Button
        data={this.state.data}
        name={iconName}
        backgroundColor="rgba(0,0,0,0)"
        color={color}
        underlayColor="rgba(0,0,0,0)"
        size={20}
        iconStyle={{ marginLeft: -10, marginRight: 0 }}
        activeOpacity={1}
        borderRadius={5}
        onPress={this.props.onCheckBoxPressed}
      />
    );
  }
}

module.exports = CheckBox;
