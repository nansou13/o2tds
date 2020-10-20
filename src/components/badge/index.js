import React from 'react';
import { Badge as AntdBadge } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import { childrenPropType, domPropTypes } from '../defaultPropTypes';
import './index.less';

const Badge = (props) => <AntdBadge {...props} />;

Badge.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
  style: PropTypes.shape(),
  count: PropTypes.number,
  offset: PropTypes.arrayOf(PropTypes.number),
});

Badge.defaultProps = {
  style: {},
  count: null,
  offset: [0, 0],
};

export default Badge;
