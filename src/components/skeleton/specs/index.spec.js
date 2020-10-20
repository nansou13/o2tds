import React from 'react';
import { shallow } from 'enzyme';

import Skeleton from '..';

describe('Skeleton component', () => {
  let props;

  beforeEach(() => {
    props = {
      active: false,
      paragraph: true,
      title: true,
    };
  });

  test('should render Skeleton Component', () => {
    const wrapper = shallow(<Skeleton {...props} />);

    expect(wrapper.props()).toMatchObject(props);
  });
});
