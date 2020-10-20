import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { domPropTypes } from '../defaultPropTypes';

const AntdIcon = (props) => <Icon {...props} />;

AntdIcon.propTypes = forbidExtraProps({
  ...domPropTypes,
  type: PropTypes.string.isRequired,
  spin: PropTypes.bool,
});

AntdIcon.defaultProps = {
  spin: false,
};

export default AntdIcon;
