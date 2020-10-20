import React from 'react';
import { shallow } from 'enzyme';
import TextAreaField from '..';

describe('TextAreaField', () => {
  let props = {};
  let wrapper;
  const onChange = jest.fn();
  let onBlur;
  let setFocusedField;

  beforeEach(() => {
    onBlur = jest.fn();
    setFocusedField = jest.fn();

    props = {
      disabled: false,
      fieldId: 'ipe_task',
      isRequired: true,
      label: 'Title',
      onBlur,
      onChange,
      placeholder: 'poney',
      setFocusedField,
      value: [{ value: 'value' }],
      validateStatus: 'success',
    };

    wrapper = shallow(<TextAreaField {...props} />);
  });

  test('should have a Textarea component', () => {
    expect(wrapper.find('TextArea').exists()).toBe(true);
  });

  test('onChange function prop should be called with field and value when input changes', () => {
    const event = { target: { value: 'good' } };

    wrapper.find('TextArea').simulate('change', event);

    expect(onChange).toHaveBeenCalledWith('ipe_task', [{ value: 'good' }]);
  });

  describe('handleBlur', () => {
    test('should not call the onBlur method from the props if edited is false', () => {
      wrapper.instance().handleBlur();

      expect(onBlur).not.toHaveBeenCalled();
    });

    test("onBlur function should not call onBlur prop if it doesn't  exist", () => {
      wrapper = shallow(<TextAreaField {...props} onBlur={null} />);

      wrapper.find('TextArea').simulate('blur');

      expect(onBlur).not.toHaveBeenCalled();
    });

    test('onBlur function prop should be called with fieldId if edited is true and onBlur prop exists', () => {
      wrapper.setState({ edited: true });

      wrapper.find('TextArea').simulate('blur');

      expect(onBlur).toHaveBeenCalledWith('ipe_task', [{ value: 'value' }]);
    });

    test('unsetFocusedField props should be called if it exists', () => {
      const unsetFocusedField = jest.fn();
      wrapper.setProps({ unsetFocusedField });

      wrapper.find('TextArea').simulate('blur');

      expect(unsetFocusedField).toHaveBeenCalled();
    });
  });

  test('should call setFocusedField with fieldId when focusing the field', () => {
    wrapper.find('TextArea').simulate('focus');

    expect(setFocusedField).toHaveBeenCalledWith('ipe_task');
  });

  test('should not set placeholder if disabled is true', () => {
    wrapper.setProps({ disabled: true });

    const { placeholder } = wrapper.find('TextArea').props();

    expect(placeholder).toBeFalsy();
  });

  test('should set placeholder if disabled is not true', () => {
    const { placeholder } = wrapper.find('TextArea').props();

    expect(placeholder).toBe('poney');
  });
});
