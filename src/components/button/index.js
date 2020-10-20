import React from 'react';
import { Button as AntdButton } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';
import './style.less';

const Button = (props) => <AntdButton {...props} />;

Button.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  htmlType: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.shape(),
});

Button.defaultProps = {
  className: '',
  disabled: false,
  htmlType: 'button',
  id: '',
  loading: false,
  onClick: () => {},
  type: 'default',
  size: undefined,
  style: {},
};

export default Button;
