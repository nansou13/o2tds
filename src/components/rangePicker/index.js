import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import './style.less';
import { forbidExtraProps } from 'airbnb-prop-types';

const RangePicker = (props) => <DatePicker.RangePicker {...props} />;

RangePicker.propTypes = forbidExtraProps({
  format: PropTypes.string,
  locale: PropTypes.shape(),
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.shape()]),
});

RangePicker.defaultProps = {
  format: '',
  locale: {},
  onChange: () => {},
  value: [],
};

export default RangePicker;
