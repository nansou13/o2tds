import React from 'react';
import * as ReactRedux from 'react-redux';
import { mount } from 'enzyme';
import { createStore } from 'redux';
import Section from '..';

describe('Section', () => {
  let props = {};
  let onCollapseChange;
  let wrapper;
  const mockStore = createStore(() => ({}));

  beforeEach(() => {
    onCollapseChange = jest.fn();
    props = {
      children: 'children',
      icon: 'test-icon',
      id: 'poney',
      onCollapseChange,
      theme: 'blue',
      title: 'Test Title',
    };

    wrapper = mount(
      <ReactRedux.Provider store={mockStore}>
        <Section {...props}>
          <div>Section Children</div>
        </Section>
      </ReactRedux.Provider>
    );
  });

  test('should render a Section', () => {
    expect(wrapper.children().at(0).name()).toEqual('Section');
  });

  test('should render an h3 with the title', () => {
    expect(wrapper.find('h3').text()).toEqual('Test Title');
  });

  test('shoud set defaultActiveKey with defaultOpen set to true', () => {
    const { defaultActiveKey } = wrapper.find('Collapse').at(1).props();

    expect(defaultActiveKey).toBe('poney');
  });

  test('shoud not set defaultActiveKey with defaultOpen set to false', () => {
    wrapper = mount(
      <ReactRedux.Provider store={mockStore}>
        <Section {...props} defaultOpen={false}>
          <div>Section Children</div>
        </Section>
      </ReactRedux.Provider>
    );

    const { defaultActiveKey } = wrapper.find('Collapse').at(1).props();

    expect(defaultActiveKey).toBe('');
  });

  describe('with onChange methode from Collapse', () => {
    test('should call onCollapseChange with id and true if openPanels is empty', () => {
      const { onChange } = wrapper.find('Collapse').at(1).props();

      onChange([]);

      expect(onCollapseChange).toHaveBeenCalledWith('poney', true);
    });

    test('should call onCollapseChange with id and false if openPanels is not empty', () => {
      const { onChange } = wrapper.find('Collapse').at(1).props();

      onChange(['some-panel']);

      expect(onCollapseChange).toHaveBeenCalledWith('poney', false);
    });
  });
});
