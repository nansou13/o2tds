import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';
import './style.less';

const Dropdown = (props) => <AntdDropdown {...props} />;

Dropdown.Button = AntdDropdown.Button;

Dropdown.propTypes = forbidExtraProps({
  ...domPropTypes,
  ...childrenPropType,
  onVisibleChange: PropTypes.func,
  overlay: PropTypes.element,
  placement: PropTypes.string,
  trigger: PropTypes.arrayOf(PropTypes.string),
  visible: PropTypes.bool,
  overlayClassName: PropTypes.string,
  overlayStyle: PropTypes.shape(),
});

Dropdown.defaultProps = {
  placement: 'bottomLeft',
  trigger: ['hover'],
  overlayStyle: {},
};

export default Dropdown;
