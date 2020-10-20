import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Tooltip from '../tooltip';
import Dropdown from '../dropdown';
import { Menu } from '../menu';
import { domPropTypes } from '../defaultPropTypes';
import './style.less';

const ActionButton = ({
  className,
  flat,
  type,
  icon,
  tooltip,
  dropdownItems,
  onDropdownSelect,
  children,
  ...rest
}) => {
  const getBaseClassName = () => {
    if (flat) {
      return 'action-button-component-flat';
    }

    return type === 'close' ? 'action-button-component-close' : 'action-button-component';
  };
  const baseClassName = getBaseClassName();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMenuItemSelect = useCallback(
    ({ key }) => {
      setDropdownVisible(false);
      if (onDropdownSelect) {
        onDropdownSelect(key);
      }
    },
    [onDropdownSelect]
  );

  let content = (
    <button
      type="button"
      data-type={type}
      className={classNames(baseClassName, className)}
      data-active={dropdownVisible}
      {...rest}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </button>
  );

  if (dropdownItems && dropdownItems.length) {
    const menu = (
      <Menu className="action-button-dropdown-menu" onClick={handleMenuItemSelect}>
        {dropdownItems.map((item) =>
          !item.divider ? (
            <Menu.Item key={item.key} className="dropdown-item" onClick={item.onClick}>
              {item.icon && !item.imageIcon && (
                <div className="dropdown-item-icon">
                  <Icon icon={item.icon} />
                </div>
              )}
              {item.icon && item.imageIcon && (
                <div className="dropdown-item-icon">
                  <img src={item.icon} alt={item.label} />
                </div>
              )}
              <div className={classNames('dropdown-item-label', item.className)}>{item.label}</div>
            </Menu.Item>
          ) : (
            <Menu.Divider key={item.key} />
          )
        )}
      </Menu>
    );

    content = (
      <Dropdown
        trigger={['click']}
        placement="bottomRight"
        overlay={menu}
        onVisibleChange={setDropdownVisible}
      >
        {content}
      </Dropdown>
    );
  }

  if (tooltip) {
    content = (
      <Tooltip title={tooltip} isVisible={dropdownVisible ? false : undefined}>
        {content}
      </Tooltip>
    );
  }

  return content;
};

ActionButton.defaultProps = {
  children: undefined,
  className: undefined,
  flat: false,
  type: undefined,
  icon: undefined,
  tooltip: undefined,
};

ActionButton.propTypes = {
  ...domPropTypes,
  children: PropTypes.node,
  className: PropTypes.string,
  flat: PropTypes.bool,
  type: PropTypes.oneOf(['close']),
  icon: PropTypes.string,
  tooltip: PropTypes.node,
  dropdownItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      icon: PropTypes.node,
      label: PropTypes.node.isRequired,
    })
  ),
};

export default ActionButton;
