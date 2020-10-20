import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';
import './style.less';

export default class ProfilePicture extends Component {
  static propTypes = {
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    size: PropTypes.number,
  };

  static defaultProps = {
    className: '',
    size: 16,
  };

  render() {
    const { alt, className, src, size } = this.props;
    return <Avatar alt={alt} className={className} size={size} src={`${serverURL}${src}`} />;
  }
}
