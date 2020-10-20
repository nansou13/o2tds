import React from 'react';
import PropTypes from 'prop-types';
import { Alert as AntdAlert } from 'antd';
import './style.less';

export const Alert = (props) => (
  <div className="ds-alert">
    <AntdAlert {...props} />
  </div>
);

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
};

Alert.defaultProps = {
  message: '',
  type: 'success',
};

export default React.memo(Alert);
