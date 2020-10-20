import React from 'react';
import { mount } from 'enzyme';
import Widget from '..';

describe('Widget', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Widget title="Test Title" extra="Test Extra">
        Test Contents
      </Widget>
    );
  });

  test('should render Card component ', () => {
    expect(wrapper.find('Card').exists()).toEqual(true);
  });

  test('should render Card component ', () => {
    expect(wrapper.find('div.title').text()).toEqual('Test Title');
    expect(wrapper.find('div.extra').text()).toEqual('Test Extra');
    expect(wrapper.find('div.body').text()).toEqual('Test Contents');
  });
});
