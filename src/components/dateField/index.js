import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { forbidExtraProps } from 'airbnb-prop-types';
import PropTypes from 'prop-types';
import { extractFieldValue, forgeFieldValue } from '../../services/dataTransform';
import FormItem from '../formItem';
import './style.less';

const DOMAIN_MODEL_DATE_FORMAT = 'YYYY-MM-DD';

class DateField extends Component {
  static propTypes = forbidExtraProps({
    disabled: PropTypes.bool,
    fieldId: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    help: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    setFocusedField: PropTypes.func,
    unsetFocusedField: PropTypes.func,
    value: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string,
      })
    ).isRequired,
    validateStatus: PropTypes.string,
  });

  static defaultProps = {
    disabled: false,
    help: null,
    isRequired: false,
    label: null,
    placeholder: null,
    setFocusedField: () => {},
    unsetFocusedField: () => {},
    validateStatus: null,
  };

  handleChange = (dateMoment) => {
    const { fieldId, onChange } = this.props;
    onChange(
      fieldId,
      dateMoment ? forgeFieldValue(dateMoment.format(DOMAIN_MODEL_DATE_FORMAT)) : []
    );
  };

  handleBlur = () => {
    const { unsetFocusedField } = this.props;

    unsetFocusedField();
  };

  handleFocus = () => {
    const { fieldId, setFocusedField } = this.props;

    setFocusedField(fieldId);
  };

  getFormattedValue = () => {
    const { value } = this.props;
    const extractedValue = extractFieldValue(value);
    if (!extractedValue) {
      return null;
    }

    return moment(extractedValue);
  };

  render() {
    const { disabled, format, help, isRequired, label, placeholder, validateStatus } = this.props;

    return (
      <FormItem
        hasFeedback={!!validateStatus}
        help={help}
        label={label}
        required={isRequired}
        validateStatus={validateStatus}
      >
        <DatePicker
          className="date-picker-field"
          disabled={disabled}
          format={format.toUpperCase()}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          placeholder={!disabled ? placeholder : undefined}
          value={this.getFormattedValue()}
        />
      </FormItem>
    );
  }
}

export default DateField;
