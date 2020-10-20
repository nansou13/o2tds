import React from 'react';
import PropTypes from 'prop-types';
import { Select as AntdSelect } from 'antd';

const { Option } = AntdSelect;

export const Select = ({ options, ...props }) => (
  <AntdSelect {...props}>
    {options &&
      options.map((item) => (
        <Option key={item.value} value={item.value}>
          {item.title}
        </Option>
      ))}
  </AntdSelect>
);

Select.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  dropdownMatchSelectWidth: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  size: PropTypes.string,
};

Select.defaultProps = {
  disabled: false,
  dropdownMatchSelectWidth: true,
  options: [],
};
