import React from 'react';
import { mount, shallow } from 'enzyme';
import NumberField from '..';

describe('NumberField component', () => {
  let props = {};
  let wrapper;
  let onChange;
  let onBlur;
  let setFocusedField;
  let unsetFocusedField;

  beforeEach(() => {
    setFocusedField = jest.fn();
    unsetFocusedField = jest.fn();
    onChange = jest.fn();
    onBlur = jest.fn();

    props = {
      disabled: false,
      fieldId: 'fieldId',
      format: '#,##0',
      locale: 'fr',
      onBlur,
      onChange,
      placeholder: 'poney',
      setFocusedField,
      unsetFocusedField,
      type: 'long',
      value: [{ value: '12345.678' }],
    };

    wrapper = mount(<NumberField {...props} />);
  });

  test('should show input with formatted value by default', () => {
    wrapper = shallow(<NumberField {...props} />);

    expect(wrapper.find('.input-number-display').prop('value')).toEqual('12345,678');
  });

  test('activateEditMode should set editMode to true and editValue to extracted value', () => {
    wrapper.instance().activateEditMode();

    expect(wrapper.state().editValue).toBe('12345.678');
    expect(wrapper.state().editMode).toBe(true);
  });

  test('deactivateEditMode should set editMode to false', () => {
    wrapper.setState({ editMode: true });
    wrapper.instance().deactivateEditMode();

    expect(wrapper.state().editMode).toBe(false);
  });

  test('handleChange should set editValue to target value and edited to true', () => {
    wrapper.instance().handleChange({ target: { value: '1200' } });

    expect(wrapper.state().editValue).toBe('1200');
    expect(wrapper.state().edited).toBe(true);
  });

  describe('handleKeyPress', () => {
    test.each(['e', 'E'])(
      'should prevent the default behaviour of type decimal if key code is',
      (key) => {
        const preventDefault = jest.fn();
        const event = { preventDefault, key };
        wrapper = shallow(<NumberField {...props} type="decimal" />);

        wrapper.instance().handleKeyPress(event);

        expect(preventDefault).toHaveBeenCalled();
      }
    );

    test.each(['e', 'E', '.', ','])(
      'should prevent the default behaviour of type long if key code is',
      (key) => {
        const preventDefault = jest.fn();
        const event = { preventDefault, key };

        wrapper.instance().handleKeyPress(event);

        expect(preventDefault).toHaveBeenCalled();
      }
    );
  });

  describe('handleBlur', () => {
    test('should not call the onBlur method from props if edited is false', () => {
      wrapper.instance().handleBlur({ target: { value: '1200' } });

      expect(onBlur).not.toHaveBeenCalled();
    });

    describe('with edited state set to true', () => {
      beforeEach(() => {
        wrapper.setState({ edited: true });
        wrapper.instance().handleBlur({ target: { value: '1200' } });
      });

      test('should set editMode to false', () => {
        expect(wrapper.state().editMode).toEqual(false);
      });

      test('should call the onChange method from props with value', () => {
        expect(onChange).toHaveBeenCalledWith('fieldId', [{ value: '1200' }]);
      });

      test('should call the onBlur method from props with fieldId if it exists and edited is true', () => {
        expect(onBlur).toHaveBeenCalledWith('fieldId', [{ value: '1200' }]);
      });
    });

    test('should call the unsetFocusedField method from props', () => {
      wrapper.instance().handleBlur({ target: { value: '1200' } });

      expect(unsetFocusedField).toHaveBeenCalled();
    });
  });

  test('should call setFocusedField method from props with fieldId on focus', () => {
    wrapper.instance().handleFocus();

    expect(setFocusedField).toHaveBeenCalledWith('fieldId');
  });

  test('should not set placeholder if disabled is true', () => {
    const propsWithDisabled = {
      ...props,
      disabled: true,
    };
    wrapper = shallow(<NumberField {...propsWithDisabled} />);

    const { placeholder } = wrapper.find('.input-number').props();

    expect(placeholder).toBeFalsy();
  });

  test('should set placeholder if disabled is not true', () => {
    const { placeholder } = wrapper.find('Input').at(1).props();

    expect(placeholder).toBe('poney');
  });
});
