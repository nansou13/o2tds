import React from 'react';
import { Form as AntdForm } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';
import { ERROR, SUCCESS, VALIDATING, WARNING } from './constants';
import './style.less';

const FormItem = (props) => <AntdForm.Item {...props} />;

FormItem.propTypes = forbidExtraProps({
  ...childrenPropType,
  className: PropTypes.string,
  colon: PropTypes.bool,
  hasFeedback: PropTypes.bool,
  help: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  required: PropTypes.bool,
  validateStatus: PropTypes.oneOf([SUCCESS, ERROR, VALIDATING, WARNING, null]),
});

FormItem.defaultProps = {
  className: '',
  colon: false,
  hasFeedback: false,
  help: null,
  label: null,
  onMouseEnter: null,
  onMouseLeave: null,
  required: false,
  validateStatus: null,
};

export default FormItem;
