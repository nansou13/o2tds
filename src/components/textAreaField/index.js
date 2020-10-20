import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { extractFieldValue } from '../../services/dataTransform';
import FormItem from '../formItem';
import './style.less';

class TextAreaField extends Component {
  static propTypes = forbidExtraProps({
    disabled: PropTypes.bool.isRequired,
    fieldId: PropTypes.string,
    help: PropTypes.string,
    isRequired: PropTypes.bool.isRequired,
    label: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    setFocusedField: PropTypes.func,
    unsetFocusedField: PropTypes.func,
    validateStatus: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.any).isRequired,
  });

  static defaultProps = {
    disabled: false,
    help: null,
    isRequired: false,
    label: null,
    onBlur: null,
    placeholder: undefined,
    setFocusedField: () => {},
    unsetFocusedField: () => {},
    validateStatus: null,
  };

  state = {
    edited: false,
  };

  handleBlur = () => {
    const { fieldId, onBlur, unsetFocusedField, value } = this.props;
    const { edited } = this.state;

    unsetFocusedField();

    if (onBlur && edited) {
      onBlur(fieldId, value);
      this.setState({ edited: false });
    }
  };

  onChange = (e) => {
    const { value } = e.target;
    const { onChange, fieldId } = this.props;
    onChange(fieldId, [{ value }]);
    this.setState({ edited: true });
  };

  handleFocus = () => {
    const { fieldId, setFocusedField } = this.props;

    setFocusedField(fieldId);
  };

  render() {
    const { disabled, help, isRequired, label, placeholder, value, validateStatus } = this.props;

    return (
      <FormItem
        className="textarea-field"
        hasFeedback={!!validateStatus}
        help={help}
        label={label}
        required={isRequired}
        validateStatus={validateStatus}
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 12 }}
          className={`textarea-input ${disabled ? 'disabled' : ''}`}
          readOnly={disabled}
          onBlur={this.handleBlur}
          onChange={this.onChange}
          onFocus={this.handleFocus}
          placeholder={!disabled ? placeholder : undefined}
          value={extractFieldValue(value)}
        />
      </FormItem>
    );
  }
}

export default TextAreaField;
