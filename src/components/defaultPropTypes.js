import PropTypes from 'prop-types';

export const childrenPropType = {
  children: PropTypes.node.isRequired,
};

export const domPropTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onContextMenu: PropTypes.func,
  onFocus: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onSelect: PropTypes.func,
  onScroll: PropTypes.func,
  onTouchStart: PropTypes.func,
  style: PropTypes.object,
};

export const antdMenuSubMenu = {
  popupClassName: PropTypes.string,
  disabled: PropTypes.bool,
  key: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onTitleClick: PropTypes.func,
};

export const antdMenuItemPropTypes = {
  active: PropTypes.bool,
  builtinPlacements: PropTypes.object,
  disabled: PropTypes.bool,
  eventKey: PropTypes.string,
  expandIcon: PropTypes.node,
  forceSubMenuRender: PropTypes.bool,
  index: PropTypes.number,
  inlineIndent: PropTypes.number,
  itemIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  level: PropTypes.number,
  manualRef: PropTypes.func,
  mode: PropTypes.string,
  motion: PropTypes.shape(),
  menu: PropTypes.bool,
  multiple: PropTypes.bool,
  onItemHover: PropTypes.func,
  onDeselect: PropTypes.func,
  onOpenChange: PropTypes.func,
  openAnimation: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  openKeys: PropTypes.arrayOf(PropTypes.string),
  openTransitionName: PropTypes.string,
  parentMenu: PropTypes.object,
  renderMenuItem: PropTypes.func,
  rootPrefixCls: PropTypes.string,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  subMenuCloseDelay: PropTypes.number,
  subMenuKey: PropTypes.string,
  subMenuOpenDelay: PropTypes.number,
  title: PropTypes.string,
  triggerSubMenuAction: PropTypes.string,
};
