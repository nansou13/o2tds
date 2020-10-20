import React, { Component } from 'react';
import { Row as AntdRow } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';

export class Row extends Component {
  static propTypes = forbidExtraProps({
    ...childrenPropType,
    ...domPropTypes,
    type: PropTypes.oneOf(['flex']),
    justify: PropTypes.oneOf(['start', 'end']),
  });

  static defaultProps = {
    type: 'flex',
    justify: 'start',
  };

  render() {
    return <AntdRow {...this.props} />;
  }
}

export default Row;
