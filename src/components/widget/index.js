import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';
import Card from '../card';
import './style.less';

const Widget = (props) => {
  const { className, children, extra, title } = props;

  return (
    <Card className={`widget ${className}`} extra={extra} title={<h4>{title}</h4>}>
      {children}
    </Card>
  );
};

Widget.propTypes = forbidExtraProps({
  ...childrenPropType,
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  extra: PropTypes.node,
});

Widget.defaultProps = {
  className: '',
  extra: '',
};

export default Widget;
