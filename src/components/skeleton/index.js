import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton as AntdSkeleton } from 'antd';
import { forbidExtraProps } from 'airbnb-prop-types';

const Skeleton = (props) => <AntdSkeleton {...props} />;

Skeleton.propTypes = forbidExtraProps({
  active: PropTypes.bool,
  avatar: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({ shape: PropTypes.string })]),
  className: PropTypes.string,
  paragraph: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
  title: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape()]),
});

Skeleton.defaultProps = {
  active: true,
  avatar: false,
  className: '',
  paragraph: true,
  title: false,
};

export default Skeleton;
