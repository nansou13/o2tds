import React from 'react';
import { shallow } from 'enzyme';
import EllipsisTooltip from '..';

describe('EllipsisTooltip', () => {
  const props = {};
  let wrapper;
  const textExemple = 'Exemple text';

  beforeEach(() => {
    wrapper = shallow(<EllipsisTooltip {...props} title={textExemple} />);
  });

  test('should display the component', () => {
    expect(wrapper).toHaveLength(1);
  });

  test('should display the text as children', () => {
    expect(wrapper.find('.ellipsis-content').props().children).toEqual(textExemple);
  });

  test('should have the Tooltip component whit good props', () => {
    expect(wrapper.find('Tooltip')).toHaveLength(1);
    expect(wrapper.find('Tooltip').props().title).toEqual(textExemple);
  });

  test('no overflow', () => {
    const realUseState = React.useState;
    const stubInitialState = false;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(stubInitialState));
    wrapper = shallow(<EllipsisTooltip {...props}>{textExemple}</EllipsisTooltip>);
    expect(wrapper.find('Tooltip').exists()).toBe(false);
  });

  test('has overflow', () => {
    const realUseState = React.useState;
    const stubInitialState = true;
    jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(stubInitialState));
    wrapper = shallow(<EllipsisTooltip {...props}>{textExemple}</EllipsisTooltip>);

    expect(wrapper.find('Tooltip').exists()).toBe(true);
  });

  test('should pass the given mouseEnterDelay prop to Tooltip', () => {
    wrapper.setProps({ mouseEnterDelay: 1 });

    expect(wrapper.find('Tooltip').props().mouseEnterDelay).toBe(1);
  });
});
