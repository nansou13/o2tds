import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as AntdAvatar } from 'antd';

export const Avatar = (props) => (
  <AntdAvatar {...props} />
);

Avatar.propTypes = {
  shape: PropTypes.oneOf(['circle', 'square']),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['large', 'small', 'default']),
  ]),
  src: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  shape: 'square',
  size: 'default',
};

export default React.memo(Avatar);
