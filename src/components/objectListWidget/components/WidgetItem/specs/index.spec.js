import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import WidgetItem from '..';

describe('WidgetItem', () => {
  let wrapper;
  let props;
  let onItemClick;
  const locale = moment.locale();

  const getWrapper = (nextProps) => shallow(<WidgetItem {...props} {...nextProps} />);

  beforeEach(() => {
    moment.locale('fr-FR');
    onItemClick = jest.fn();
    props = {
      item: {
        fields: { createdDate: '2020-01-12' },
        icon: 'document',
        path: 'poney',
        title: 'unicorn',
        description: 'poneyscription',
      },
      onItemClick,
      sort: 'createdDate',
    };

    wrapper = getWrapper();
  });

  afterEach(() => {
    moment.locale(locale);
  });

  test('should render correctly', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('should render as much widget item attribute as fields in item', () => {
    const fields = { createdDate: '12/01/2020' };

    wrapper.setProps({ item: { ...props.item, fields } });

    expect(wrapper.find('.widget-item-attribute')).toHaveLength(Object.keys(fields).length);
  });

  test('should call onItemClik on click', () => {
    wrapper.find('.widget-item').simulate('click');

    expect(onItemClick).toHaveBeenCalled();
  });

  test('should render date in dd/MM/yyyy format', () => {
    const fields = { createdDate: '2020-02-22' };

    wrapper.setProps({ item: { ...props.item, fields } });

    expect(wrapper.find('.widget-item-attribute').text()).toBe('22/02/2020');
  });

  test('should render date according to locale', () => {
    moment.locale('en-US');
    const fields = { createdDate: '2020-02-22' };

    wrapper.setProps({ item: { ...props.item, fields } });

    expect(wrapper.find('.widget-item-attribute').text()).toBe('02/22/2020');
  });

  test("should render today's date date according to locale", () => {
    moment.locale('en-US');
    const fields = { createdDate: undefined };

    wrapper.setProps({ item: { ...props.item, fields } });

    expect(wrapper.find('.widget-item-attribute').text()).toEqual('');
  });

  test('should display a drag handle when drag and drop is not disabled', () => {
    wrapper = getWrapper({ disabledDnd: false });

    expect(wrapper.find('.widget-item').children().length).toBe(4);
  });

  test('should not display a drag handle when drag and drop is disabled', () => {
    expect(wrapper.find('.widget-item').children().length).toBe(3);
  });

  test('when description is passed as a string, should render text', () => {
    expect(wrapper.find('.widget-item-description').text()).toBe('poneyscription');
  });

  test('when description is passed as an array, should render contents joined with separator', () => {
    props = {
      ...props,
      item: {
        ...props.item,
        description: ['Part 1', 'Part 2'],
      },
    };

    wrapper.setProps(props);

    expect(wrapper.find('.widget-item-description').text()).toBe('Part 1 • Part 2');
  });
});
