import React from 'react';
import { shallow } from 'enzyme';
import InputField from '..';

describe('InputField component', () => {
  let props = {};
  let wrapper;
  const onChange = jest.fn();

  beforeEach(() => {
    props = {
      value: 'ok',
      label: 'Title',
      onChange,
    };

    wrapper = shallow(<InputField {...props} />);
  });

  test('should have an input component', () => {
    expect(wrapper.find('Input').exists()).toBe(true);
  });

  test('onChange function prop should be called with value when input changes', () => {
    const event = { target: { value: 'good' } };

    wrapper.find('Input').simulate('change', event);

    expect(onChange).toHaveBeenCalledWith('good');
  });
});
