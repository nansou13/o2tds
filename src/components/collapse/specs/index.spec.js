import React from 'react';
import { mount } from 'enzyme';
import { Collapse, Panel } from '..';

describe('Collapse and Panel', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Collapse>
        <Panel header="test-header">Test Children</Panel>
      </Collapse>
    );
  });

  test('should render Antd Collapse and Panel', () => {
    expect(wrapper.find('Collapse').exists()).toEqual(true);
    expect(wrapper.find('Panel').exists()).toEqual(true);
    expect(wrapper.find('Panel').props().header).toEqual('test-header');
  });
});
