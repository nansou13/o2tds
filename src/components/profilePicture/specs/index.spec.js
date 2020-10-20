import React from 'react';
import { shallow } from 'enzyme';
import ProfilePicture from '..';

describe('ProfilePicture component', () => {
  let props;

  beforeEach(() => {
    props = {
      alt: 'test',
      src: 'test/src/img.png',
    };
  });

  test('Should render an Avatar component', () => {
    const wrapper = shallow(<ProfilePicture {...props} />);

    expect(wrapper.find('Avatar').exists()).toBe(true);
  });

  test('Should set default size to 16', () => {
    const wrapper = shallow(<ProfilePicture {...props} />);

    expect(wrapper.find('Avatar').props().size).toBe(16);
  });
});
