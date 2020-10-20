import React from 'react';
import { shallow } from 'enzyme';
import { Header as SystemDesignHeader } from '..';

describe('Header', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SystemDesignHeader>children</SystemDesignHeader>);
  });

  test('should render Antd Layout.Header', () => {
    expect(wrapper.html()).toBe('<header class="ant-layout-header">children</header>');
  });
});
