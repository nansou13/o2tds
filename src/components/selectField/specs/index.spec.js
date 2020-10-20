import React from 'react';
import { mount, shallow } from 'enzyme';

import SelectField from '..';

describe('SelectField component', () => {
  let props;
  let onBlur;
  let setFocusedField;
  let unsetFocusedField;

  beforeEach(() => {
    onBlur = jest.fn();
    setFocusedField = jest.fn();
    unsetFocusedField = jest.fn();

    props = {
      fieldId: 'field-id',
      modelValues: {
        selected: [
          {
            badge: 3,
            key: 'oranges',
            title: 'Oranges',
            value: 'rngs',
          },
        ],
        available: [
          {
            badge: 3,
            key: 'oranges',
            title: 'Oranges',
          },
        ],
      },
      onBlur,
      setFocusedField,
      unsetFocusedField,
    };
  });

  test('should render SelectField Component', () => {
    const wrapper = mount(<SelectField {...props} />);

    expect(
      wrapper
        .find('.select-field')
        .children()
        .map((c) => c.name())
    ).toEqual(['FormItem', 'div']);
  });

  test('should render SelectField Component with a label if label exist', () => {
    const wrapper = mount(<SelectField {...props} label="Test Label" />);

    expect(wrapper.find('label').text()).toEqual('Test Label');
  });

  test('should render SelectField Component without a label if label is not passed', () => {
    const wrapper = mount(<SelectField {...props} />);

    expect(wrapper.find('label').length).toEqual(0);
  });

  test('should render a required SelectField Component', () => {
    const wrapper = mount(<SelectField {...props} label="asdf" isRequired />);

    expect(wrapper.find('label').hasClass('ant-form-item-required')).toEqual(true);
  });

  test('should call onBlur and unsetFocusedField from props on blur', () => {
    const wrapper = mount(<SelectField {...props} />);

    wrapper.find('.select-full-width').at(0).props().onBlur();

    expect(onBlur).toHaveBeenCalled();
    expect(unsetFocusedField).toHaveBeenCalled();
  });

  test('should call setFocusedField with fieldId from props on focus', () => {
    const wrapper = mount(<SelectField {...props} />);

    wrapper.find('.select-full-width').at(0).props().onFocus();

    expect(setFocusedField).toHaveBeenCalledWith('field-id');
  });

  describe('optionsContainer', () => {
    test('should render a SelectField Component with only an info icon', () => {
      const infoMessage = 'This depends on another';

      const wrapper = mount(<SelectField {...props} label="asdf" infoMessage={infoMessage} />);

      expect(wrapper.find('.info-message').exists()).toBe(true);
      expect(wrapper.find('.open-in-a-new-tab-icon').exists()).toBe(false);
    });

    test('should render a SelectField Component with only a new tab icon', () => {
      const newTabUrl = 'poney';

      const wrapper = mount(<SelectField {...props} newTabUrl={newTabUrl} />);

      expect(wrapper.find('.open-in-a-new-tab-icon').exists()).toBe(true);
      expect(wrapper.find('.info-message').exists()).toBe(false);
    });

    test('should render a SelectField Component with both info icon and new tab icon', () => {
      const infoMessage = 'This depends on another';
      const newTabUrl = 'poney';

      const wrapper = mount(
        <SelectField {...props} newTabUrl={newTabUrl} label="asdf" infoMessage={infoMessage} />
      );

      expect(wrapper.find('.info-message').exists()).toBe(true);
      expect(wrapper.find('.open-in-a-new-tab-icon').exists()).toBe(true);
    });
  });

  test('should not set placeholder if disabled is true', () => {
    const wrapper = shallow(<SelectField {...props} disabled />);

    const { placeholder } = wrapper.find('SelectField').props();

    expect(placeholder).toBe(undefined);
  });

  test('should set placeholder if disabled is not true', () => {
    const wrapper = shallow(<SelectField {...props} placeholder="poney" />);

    const { placeholder } = wrapper.find('SelectField').props();

    expect(placeholder).toBe('poney');
  });

  test('should show arrow if disabled is not true', () => {
    const wrapper = mount(<SelectField {...props} disabled />);

    const { showArrow } = wrapper.find('.select-full-width').at(1).props();

    expect(showArrow).toBe(false);
  });

  test('should show arrow if disabled is not true', () => {
    const wrapper = mount(<SelectField {...props} />);

    const { showArrow } = wrapper.find('.select-full-width').at(1).props();

    expect(showArrow).toBe(true);
  });
});
