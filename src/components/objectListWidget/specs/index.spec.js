import React from 'react';
import { mount } from 'enzyme';
import ObjectListWidget from '..';

describe('ObjectListWidget', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    const onItemClick = jest.fn();
    props = {
      items: [
        {
          fields: {},
          icon: 'document',
          cardUri: 'poney0',
          path: 'poney',
          title: 'unicorn',
        },
      ],
      loading: false,
      onItemClick,
    };

    wrapper = mount(<ObjectListWidget {...props} />);
  });

  test('should render correctly', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('should render skeleton if loading is true', () => {
    wrapper.setProps({ loading: true });

    expect(wrapper.find('ObjectListWidgetSkeleton').exists()).toBe(true);
  });

  test.each([undefined, []])('should render empty component if there is no items', (items) => {
    wrapper.setProps({ items });

    expect(wrapper.find('Empty').exists()).toBe(true);
  });

  test('should render as much WidgetItem as item in dataSource', () => {
    const items = [
      {
        fields: {},
        icon: 'document',
        path: 'poney1',
        cardUri: 'poney1',
        title: 'unicorn',
      },
      {
        fields: {},
        icon: 'document',
        path: 'poney2',
        cardUri: 'poney2',
        title: 'unicorn',
      },
      {
        fields: {},
        icon: 'document',
        path: 'poney3',
        cardUri: 'poney3',
        title: 'unicorn',
      },
      {
        fields: {},
        icon: 'document',
        path: 'poney4',
        cardUri: 'poney4',
        title: 'unicorn',
      },
    ];
    wrapper.setProps({ items });

    expect(wrapper.find('.widget-list').children()).toHaveLength(items.length);
  });

  test('should render show more button if onShowMore is provided', () => {
    wrapper.setProps({ onShowMore: () => {} });

    expect(wrapper.find('Button').exists()).toBe(true);
  });

  test('should not render show more button if onShowMore is not provided', () => {
    expect(wrapper.find('Button').exists()).toBe(false);
  });
});
