import React from 'react';
import PropTypes from 'prop-types';
import { Layout as AntdLayout } from 'antd';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType, domPropTypes } from '../defaultPropTypes';

export const Layout = (props) => <AntdLayout {...props} />;
Layout.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
});

export const Sider = (props) => <AntdLayout.Sider {...props} />;
Sider.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
});

export const Content = (props) => <AntdLayout.Content {...props} />;
Content.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
});
