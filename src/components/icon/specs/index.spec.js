import React from 'react';
import { shallow } from 'enzyme';

import Icon from '..';

describe('Icon component', () => {
  test('should render single prop', () => {
    const homeIcon = 'home';

    const wrapper = shallow(<Icon icon={homeIcon} />);

    expect(wrapper.name()).toEqual('i');
  });

  test('should render a suspense lazy component with known value slideboard', () => {
    const wrapper = shallow(<Icon icon="slideboard" className="bar" />);

    expect(wrapper.name()).toEqual('span');
    expect(wrapper.prop('className')).toEqual('board-icon-wrapper bar');
    expect(
      wrapper
        .find('span')
        .children()
        .map((c) => c.name().toString())
    ).toEqual(['Suspense']);
  });
});
