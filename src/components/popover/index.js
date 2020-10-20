import React from 'react';
import { Popover as AntdPopover } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';
import './style.less';

const Popover = (props) => <AntdPopover {...props} />;

const antdPopoverPropTypes = {
  onVisibleChange: PropTypes.func,
};

Popover.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...antdPopoverPropTypes,
  ...domPropTypes,
  content: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]).isRequired,
  overlayClassName: PropTypes.string,
  placement: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.shape(), PropTypes.string]),
  trigger: PropTypes.string,
  visible: PropTypes.bool,
  style: PropTypes.shape(),
});

Popover.defaultProps = {
  overlayClassName: '',
  placement: '',
  trigger: '',
  style: {},
};

export default Popover;
