import React from 'react';
import { shallow } from 'enzyme';
import Card from '..';

describe('Card', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Card title="Test Title">Test Contents</Card>);
  });

  test('should render Card component structure', () => {
    const cardWrapper = wrapper.find('div.o2t-card');
    const headerWrapper = cardWrapper.find('div.header');
    const titleWrapper = headerWrapper.find('div.title');
    const extraWrapper = headerWrapper.find('div.extra');
    const bodyWrapper = cardWrapper.find('div.body');

    expect(cardWrapper.exists()).toBe(true);
    expect(headerWrapper.exists()).toBe(true);
    expect(titleWrapper.exists()).toBe(true);
    expect(extraWrapper.exists()).toBe(true);
    expect(bodyWrapper.exists()).toBe(true);
  });

  test('should render title', () => {
    expect(wrapper.find('div.title').text()).toEqual('Test Title');
  });

  test('should render children', () => {
    expect(wrapper.find('div.body').text()).toEqual('Test Contents');
  });
});
