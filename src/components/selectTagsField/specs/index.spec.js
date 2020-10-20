import React from 'react';
import { shallow } from 'enzyme';
import intl from 'react-intl-universal';
import { SelectTagsField } from '..';

describe('SelectTagsField component', () => {
  let wrapper;
  let props;
  let onChange;
  const getWrapper = () => shallow(<SelectTagsField {...props} />);
  const simulateClickAdd = (w) => w.find({ type: 'link', size: 'small' }).simulate('click');
  intl.load({ SELECT_TAGS_FIELD_CREATE: 'Create a tag' });

  beforeEach(() => {
    onChange = jest.fn();

    props = {
      onChange,
      options: [
        {
          uri: 'poney',
          name: 'poney',
          color: 'red',
        },
        {
          uri: 'horsey',
          name: 'horsey',
          color: 'red',
        },
      ],
      selectedOptions: [],
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render SelectTagsField Component', () => {
    wrapper = getWrapper();

    expect(wrapper.find('.select-tag-field').exists()).toBe(true);
  });

  test('should render SelectTagsField Component with a label if label exist', () => {
    props = {
      ...props,
      label: 'Test Label',
    };

    wrapper = getWrapper();

    expect(wrapper.find('.select-tag-field-label').text()).toEqual('Test Label');
  });

  test('should render SelectTagsField Component without a label if label is not passed', () => {
    wrapper = getWrapper();

    expect(wrapper.find('.select-tag-field-label').exists()).toEqual(false);
  });

  test('should render Select Component with a placeholder if placeholder exists', () => {
    props = {
      ...props,
      placeholder: 'poney',
    };

    wrapper = getWrapper();
    simulateClickAdd(wrapper);

    expect(wrapper.find('Select').props().placeholder).toBe('poney');
  });

  test('should render Select Component without a label if label is not passed', () => {
    wrapper = getWrapper();
    simulateClickAdd(wrapper);

    expect(wrapper.find('Select').props().placeholder).toBe(null);
  });

  test('should render Select Options when tag options are passed', () => {
    wrapper = getWrapper();
    simulateClickAdd(wrapper);

    expect(wrapper.find('Select Option').length).toEqual(2);
  });

  test('should not show the add button when the limit of tags has been reached', () => {
    props = {
      ...props,
      limitTags: 2,
    };

    wrapper = getWrapper();
    simulateClickAdd(wrapper);

    expect(wrapper.find({ type: 'link', size: 'small' }).exists()).toBe(false);
  });

  test('should show the add button when limitTags is false', () => {
    props = {
      ...props,
      limitTags: 0,
    };

    wrapper = getWrapper();

    expect(wrapper.find({ type: 'link', size: 'small' }).exists()).toBe(true);
  });

  test('should add class flex-direction-column when flexDirectionColumn is passed as true', () => {
    props = {
      ...props,
      flexDirectionColumn: true,
    };

    wrapper = getWrapper();

    expect(wrapper.find('.select-tag-field').props().className).toEqual(
      expect.stringContaining('flex-direction-column')
    );
  });

  test('should call onSelect when Select is changed', () => {
    wrapper = getWrapper();

    simulateClickAdd(wrapper);
    wrapper.find('Select').simulate('select', { key: 'poney' });

    expect(onChange).toHaveBeenNthCalledWith(1, [
      {
        title: 'poney',
        value: 'poney',
        color: 'red',
      },
    ]);
  });
});
