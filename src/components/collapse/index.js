import React from 'react';
import PropTypes from 'prop-types';
import { Collapse as AntdCollapse } from 'antd';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';
import './style.less';

const { Panel: AntdPanel } = AntdCollapse;

export const Collapse = ({ ...props }) => <AntdCollapse {...props} />;

Collapse.propTypes = forbidExtraProps({
  ...childrenPropType,
  bordered: PropTypes.bool,
  className: PropTypes.string,
  defaultActiveKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  expandIconPosition: PropTypes.string,
  onChange: PropTypes.func,
  activeKey: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
});

Collapse.defaultProps = {
  bordered: false,
  className: '',
  defaultActiveKey: '',
  expandIconPosition: 'right',
  onChange: null,
  activeKey: [],
};

export const Panel = ({ children, ...props }) => <AntdPanel {...props}>{children}</AntdPanel>;

Panel.propTypes = {
  ...childrenPropType,
  header: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
};
