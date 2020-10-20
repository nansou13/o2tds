import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import * as DataTransform from 'services/dataTransform';
import DateField from '..';

describe('DateField component', () => {
  let props;
  let wrapper;
  const format = 'DD-MM-YYYY';
  const onChange = jest.fn();
  let setFocusedField;
  let unsetFocusedField;

  beforeEach(() => {
    setFocusedField = jest.fn();
    unsetFocusedField = jest.fn();

    props = {
      disabled: false,
      fieldId: 'fieldId',
      format,
      isRequired: true,
      label: 'label',
      onChange,
      placeholder: 'poney',
      setFocusedField,
      unsetFocusedField,
      value: [moment()],
    };
    wrapper = shallow(<DateField {...props} />);
  });

  test('should have a DatePicker component', () => {
    expect(wrapper.find('.date-picker-field').exists()).toBe(true);
  });

  test('should set given value', () => {
    const testMoment = '1998-09-20';
    const newProps = {
      ...props,
      value: [{ value: testMoment, title: 'some-date-title' }],
    };
    wrapper = shallow(<DateField {...newProps} />);

    const datePickerProps = wrapper.find('.date-picker-field').props();

    expect(datePickerProps.value).toEqual(moment('1998-09-20'));
  });

  test('should format and forge value with the domain model date format', () => {
    wrapper.instance().handleChange(moment('20-09-1998', format));

    expect(onChange).toHaveBeenCalledWith('fieldId', [{ value: '1998-09-20' }]);
  });

  test('should send empty string when no value to format', () => {
    wrapper.instance().handleChange();

    expect(onChange).toHaveBeenCalledWith('fieldId', []);
  });

  test('should call unsetFocusedField from props on blur', () => {
    wrapper.instance().handleBlur();

    expect(unsetFocusedField).toHaveBeenCalled();
  });

  test('should call setFocusedField from props with fieldId on focus', () => {
    wrapper.instance().handleFocus();

    expect(setFocusedField).toHaveBeenCalledWith('fieldId');
  });

  test('should not set placeholder if disabled is true', () => {
    wrapper.setProps({ disabled: true });

    const { placeholder } = wrapper.find('PickerWrapper').props();

    expect(placeholder).toBeFalsy();
  });

  test('should set placeholder if disabled is not true', () => {
    const { placeholder } = wrapper.find('PickerWrapper').props();

    expect(placeholder).toBe('poney');
  });

  describe('getFormattedValue', () => {
    test('should return null without extractedValue', () => {
      jest.spyOn(DataTransform, 'extractFieldValue').mockReturnValue(null);

      const formattedValue = wrapper.instance().getFormattedValue();

      expect(formattedValue).toBe(null);
    });

    test('should return moment with extracted value with an extractedValue', () => {
      jest.spyOn(DataTransform, 'extractFieldValue').mockReturnValue('1998-09-20');

      const formattedValue = wrapper.instance().getFormattedValue();

      expect(formattedValue).toEqual(moment('1998-09-20'));
    });
  });
});
