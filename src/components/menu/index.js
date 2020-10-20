import React from 'react';
import { Menu as AntdMenu } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import {
  childrenPropType,
  domPropTypes,
  antdMenuItemPropTypes,
  antdMenuSubMenu,
} from '../defaultPropTypes';

import './style.less';

const antdMenuPropTypes = {
  className: PropTypes.string,
  mode: PropTypes.string,
  selectable: PropTypes.bool,
  focusable: PropTypes.bool,
  expandIcon: PropTypes.node,
  prefixCls: PropTypes.string,
};

export const MenuSubMenu = (props) => <AntdMenu.SubMenu {...props} />;

MenuSubMenu.propTypes = forbidExtraProps({
  ...domPropTypes,
  ...antdMenuSubMenu,
  ...childrenPropType,
});

export const MenuItemGroup = (props) => <AntdMenu.ItemGroup {...props} />;

MenuItemGroup.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
  ...antdMenuItemPropTypes,
  title: PropTypes.string.isRequired,
});

export const MenuDivider = (props) => <AntdMenu.Divider {...props} />;

MenuDivider.propTypes = forbidExtraProps({
  ...domPropTypes,
  ...antdMenuItemPropTypes,
});

export const MenuItem = (props) => <AntdMenu.Item {...props} />;

MenuItem.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...domPropTypes,
  ...antdMenuItemPropTypes,
  disabled: PropTypes.bool,
  title: PropTypes.string,
});

MenuItem.defaultProps = {
  disabled: false,
  title: '',
};

export class Menu extends React.Component {
  static Item = MenuItem;

  static SubMenu = MenuSubMenu;

  static ItemGroup = MenuItemGroup;

  static Divider = MenuDivider;

  render() {
    return <AntdMenu {...this.props} />;
  }
}

Menu.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...antdMenuPropTypes,
  onClick: PropTypes.func,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
});

Menu.defaultProps = {
  onClick: () => {},
  selectedKeys: [],
};
