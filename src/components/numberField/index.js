import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { formatLocalized } from '../../services/decimalFormat';
import { extractFieldValue, forgeFieldValue } from '../../services/dataTransform';
import FormItem from '../formItem';
import './style.less';

class NumberField extends Component {
  inputNumber = React.createRef();

  static propTypes = forbidExtraProps({
    disabled: PropTypes.bool,
    fieldId: PropTypes.string.isRequired,
    format: PropTypes.string.isRequired,
    help: PropTypes.string,
    isRequired: PropTypes.bool,
    label: PropTypes.string,
    locale: PropTypes.string.isRequired,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    setFocusedField: PropTypes.func,
    type: PropTypes.string.isRequired,
    unsetFocusedField: PropTypes.func,
    validateStatus: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.any).isRequired,
  });

  static defaultProps = {
    disabled: false,
    fieldId: null,
    help: null,
    isRequired: false,
    label: null,
    onBlur: () => {},
    placeholder: null,
    setFocusedField: () => {},
    unsetFocusedField: () => {},
    validateStatus: null,
    value: [],
  };

  state = {
    edited: false,
    editMode: false,
    editValue: null,
  };

  componentDidMount() {
    if (this.inputNumber && this.inputNumber.current && this.inputNumber.current.input)
      this.inputNumber.current.input.addEventListener('wheel', this.handleWheel);
  }

  componentWillUnmount() {
    this.inputNumber.current.input.removeEventListener('wheel', this.handleWheel);
  }

  activateEditMode = () => {
    const { value } = this.props;
    const extractedValue = extractFieldValue(value);
    this.setState(
      {
        editValue: extractedValue,
        editMode: true,
      },
      () => {
        setTimeout(() => {
          // setTimeout is obligatory for old version firefox
          this.inputNumber.current.focus();
        });
      }
    );
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
  };

  handleBlur = (e) => {
    const { onBlur, onChange, fieldId, unsetFocusedField } = this.props;
    const { edited } = this.state;
    this.deactivateEditMode();

    const {
      target: { value },
    } = e;

    if (edited) {
      this.setState({ edited: false });
      onChange(fieldId, forgeFieldValue(value));
      if (onBlur) {
        onBlur(fieldId, forgeFieldValue(value));
      }
    }

    unsetFocusedField();
  };

  handleFocus = () => {
    const { fieldId, setFocusedField } = this.props;

    setFocusedField(fieldId);
  };

  handleKeyPress = (e) => {
    const { type } = this.props;
    const { key } = e;

    if (key === 'e' || key === 'E') e.preventDefault();

    if (type === 'decimal') return;

    if (key === '.' || key === ',') e.preventDefault();
  };

  handleChange = (e) => {
    this.setState({
      edited: true,
      editValue: e.target.value,
    });
  };

  handleWheel = (e) => {
    e.preventDefault();
  };

  getDisplayValue = (value) => {
    const { locale, format } = this.props;
    return formatLocalized(locale, format, value);
  };

  render() {
    const { disabled, help, isRequired, label, placeholder, validateStatus, value } = this.props;

    const { editMode, editValue } = this.state;
    const extractedValue = extractFieldValue(value);

    return (
      <FormItem
        hasFeedback={!!validateStatus}
        help={help}
        label={label}
        required={isRequired}
        validateStatus={validateStatus}
      >
        <Input
          autoFocus
          className={`input-number ${editMode ? '' : 'hidden-input'}`}
          disabled={disabled}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onKeyPress={this.handleKeyPress}
          placeholder={!disabled ? placeholder : undefined}
          step="any"
          type="number"
          value={editValue}
          ref={this.inputNumber}
        />
        <Input
          className={`input-number-display ${editMode ? 'hidden-input' : ''}`}
          disabled={disabled}
          onFocus={disabled ? undefined : this.activateEditMode}
          placeholder={!disabled ? placeholder : undefined}
          value={this.getDisplayValue(extractedValue)}
        />
      </FormItem>
    );
  }
}

export default NumberField;
