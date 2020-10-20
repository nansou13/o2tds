import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';
import './style.less';

const Card = (props) => {
  const { children, className, extra, title } = props;

  return (
    <div className={`o2t-card ${className || ''}`}>
      <div className="header">
        <div className="title">{title}</div>
        <div className="extra">{extra}</div>
      </div>
      <div className="body">{children}</div>
    </div>
  );
};

Card.propTypes = forbidExtraProps({
  ...childrenPropType,
  className: PropTypes.string,
  extra: PropTypes.node,
  title: PropTypes.node.isRequired,
});

Card.defaultProps = {
  className: undefined,
  extra: undefined,
};

export default Card;
