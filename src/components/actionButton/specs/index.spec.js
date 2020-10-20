import React from 'react';
import { mount } from 'enzyme';
import ActionButton from '..';
import { Menu } from '../../menu';
import Tooltip from '../../tooltip';

describe('ActionButton', () => {
  it('should render common button', () => {
    const wrapper = mount(<ActionButton>Button text</ActionButton>);

    expect(wrapper.find('button').hasClass('action-button-component')).toBe(true);
    expect(wrapper.find('button').text()).toBe('Button text');
    expect(wrapper.find(Menu).exists()).toBe(false);
    expect(wrapper.find(Tooltip).exists()).toBe(false);
  });

  it('should render close button', () => {
    const wrapper = mount(<ActionButton type="close" />);

    expect(wrapper.find('button').hasClass('action-button-component-close')).toBe(true);
  });

  it('should render with tooltip', () => {
    const wrapper = mount(<ActionButton tooltip="Tooltip content" />);

    expect(wrapper.find(Tooltip).props().title).toBe('Tooltip content');
  });

  it('should handle dropdown item selection', () => {
    const items = [
      {
        key: 'item1',
        label: 'label1',
      },
    ];
    const onSelect = jest.fn();
    const wrapper = mount(<ActionButton dropdownItems={items} onDropdownSelect={onSelect} />);

    wrapper.find('button').simulate('click');
    wrapper.find(Menu.Item).simulate('click');

    expect(onSelect).toBeCalledWith('item1');
  });
});
