import React from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';
import './style.less';

const Tooltip = (props) => {
  const { isVisible } = props;

  return isVisible === undefined ? (
    <AntdTooltip {...props} />
  ) : (
    <AntdTooltip {...props} visible={isVisible} />
  );
};

Tooltip.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
  overlayClassName: PropTypes.string,
  placement: PropTypes.string,
  title: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  mouseEnterDelay: PropTypes.number,
  trigger: PropTypes.string,
});

Tooltip.defaultProps = {
  overlayClassName: '',
  placement: 'top',
  isVisible: undefined,
  mouseEnterDelay: 0.25,
};

export default Tooltip;
