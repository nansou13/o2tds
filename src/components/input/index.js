import React from 'react';
import { Input as AntdInput } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { domPropTypes } from '../defaultPropTypes';

const Input = (props) => <AntdInput {...props} />;

Input.propTypes = forbidExtraProps({
  ...domPropTypes,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.node,
  suffix: PropTypes.node,
});

Input.defaultProps = {
  disabled: false,
  onChange: () => {},
  value: undefined,
  placeholder: undefined,
  suffix: undefined,
};

export default Input;
