import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CheckBox = (props) => {
  const { data, color } = props;
  const iconName = data.completed ? 'check-box' : 'check-box-outline-blank';
  const changedColor = color || '#000';

  return (
    <Icon.Button
      data={data}
      name={iconName}
      backgroundColor="rgba(0,0,0,0)"
      color={changedColor}
      underlayColor="rgba(0,0,0,0)"
      size={20}
      iconStyle={{ marginLeft: -10, marginRight: 0 }}
      activeOpacity={1}
      borderRadius={5}
      onPress={props.onCheckBoxPressed}
    />
  );
};

CheckBox.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    completedAt: PropTypes.instanceOf(Date),
    updatedAt: PropTypes.instanceOf(Date),
  }),
  color: PropTypes.string,
  onCheckBoxPressed: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  data: () => {},
  color: '#000',
};

module.exports = CheckBox;
