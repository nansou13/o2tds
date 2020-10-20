import React from 'react';
import { shallow } from 'enzyme';
import { Row as DesignSystemRow } from '..';

describe('Row', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <DesignSystemRow type="flex" justify="end">
        children
      </DesignSystemRow>
    );
  });

  test('should render Antd Row', () => {
    expect(wrapper.first().name()).toBe('Row');
    expect(wrapper.first().props()).toMatchObject({ type: 'flex', justify: 'end' });
    expect(wrapper.first().children().text()).toBe('children');
  });
});
