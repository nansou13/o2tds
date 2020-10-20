import React from 'react';
import { shallow } from 'enzyme';
import { ObjectModelIcon } from '..';

describe('ObjectModelIcon', () => {
  let props;
  let wrapper;
  const getWrapper = () => shallow(<ObjectModelIcon {...props} />);

  beforeEach(() => {
    props = {
      icon: '',
      color: 'pink',
    };
  });

  test('should render ObjectModelIcon with color and icon passed as prop', () => {
    wrapper = getWrapper();

    const objectModelIcon = wrapper.find('.object-model-icon-container');

    expect(objectModelIcon.exists()).toEqual(true);
    expect(objectModelIcon.props().style.backgroundColor).toEqual('pink');
    expect(objectModelIcon.find('.object-model-icon').text()).toEqual('');
  });
});
