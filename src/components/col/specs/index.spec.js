import React from 'react';
import { shallow } from 'enzyme';
import { Col as DesignSystemCol } from '..';

describe('Col', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DesignSystemCol span={42}>children</DesignSystemCol>);
  });

  test('should render Antd Col', () => {
    expect(wrapper.first().name()).toBe('Col');
    expect(wrapper.first().props()).toMatchObject({ span: 42 });
    expect(wrapper.first().children().text()).toBe('children');
  });
});
