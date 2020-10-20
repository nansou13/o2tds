import React, { Component } from 'react';
import { forbidExtraProps } from 'airbnb-prop-types';
import { Layout as AntdLayout } from 'antd';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';

export class Header extends Component {
  static propTypes = forbidExtraProps({
    ...childrenPropType,
    ...domPropTypes,
  });

  render() {
    return <AntdLayout.Header {...this.props} />;
  }
}

export default Header;
