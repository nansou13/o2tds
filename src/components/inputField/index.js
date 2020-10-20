import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import FormItem from '../formItem';
import { domPropTypes } from '../defaultPropTypes';

class InputField extends Component {
  onChange = (e) => {
    const { onChange } = this.props;
    onChange(e.target.value);
  };

  render() {
    const {
      autoFocus,
      disabled,
      help,
      isRequired,
      label,
      onBlur,
      onMouseEnter,
      onMouseLeave,
      placeholder,
      value,
      validateStatus,
    } = this.props;

    return (
      <FormItem
        help={help}
        label={label}
        required={isRequired}
        hasFeedback={!!validateStatus}
        validateStatus={validateStatus}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Input
          autoFocus={autoFocus}
          disabled={disabled}
          onChange={this.onChange}
          placeholder={placeholder}
          value={value}
          onBlur={onBlur}
        />
      </FormItem>
    );
  }
}

InputField.propTypes = forbidExtraProps({
  ...domPropTypes,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  help: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  validateStatus: PropTypes.string,
  value: PropTypes.string.isRequired,
});

InputField.defaultProps = {
  autoFocus: false,
  disabled: false,
  help: null,
  isRequired: false,
  label: null,
  placeholder: null,
  validateStatus: null,
  onBlur: null,
};

export default InputField;
