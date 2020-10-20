import React, { Component } from 'react';
import { Col as AntdCol } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';

export class Col extends Component {
  static propTypes = forbidExtraProps({
    ...childrenPropType,
    ...domPropTypes,
    offset: PropTypes.number,
    span: PropTypes.number.isRequired,
  });

  static defaultProps = {
    offset: undefined,
  };

  render() {
    return <AntdCol {...this.props} />;
  }
}

export default Col;
