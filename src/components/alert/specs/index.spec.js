import React from 'react';
import { shallow } from 'enzyme';
import { Alert } from '..';

describe('Alert', () => {
  let props;
  let wrapper;
  const getWrapper = () => shallow(<Alert {...props} />);

  beforeEach(() => {
    props = {
      message: 'Hello Alert',
    };
  });

  test('should render Alert with default props', () => {
    props = {};
    wrapper = getWrapper();

    expect(wrapper.find('Alert').props()).toEqual({
      message: '',
      type: 'success',
    });
  });

  test('should render Alert with message passed as prop', () => {
    wrapper = getWrapper();

    expect(wrapper.find('Alert').props().message).toEqual('Hello Alert');
  });
});
