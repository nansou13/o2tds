import React from 'react';
import PropTypes from 'prop-types';

import './style.less';

export const ObjectModelIcon = (props) => {
  const { color, icon, size } = props;

  return (
    <div
      className="object-model-icon-container"
      style={{ backgroundColor: color, height: size, width: size }}
    >
      <div className="object-model-icon" style={{ width: size / 2, height: size / 2 }}>
        {icon}
      </div>
    </div>
  );
};

ObjectModelIcon.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.node.isRequired,
  size: PropTypes.number,
};

ObjectModelIcon.defaultProps = {
  size: 22,
  color: '#333',
};

export default ObjectModelIcon;
