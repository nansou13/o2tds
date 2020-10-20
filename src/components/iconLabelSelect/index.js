import React, { Component } from 'react';
import { Input, Button, Select, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

import Icon from '../icon';
import './style.less';

const InputGroup = Input.Group;
const { Option, OptGroup } = Select;

export default class IconLabelSelect extends Component {
  state = {
    tooltipVisible: false,
    showDropdown: false,
  };

  static defaultProps = {
    small: false,
  };

  onMouseEnter = () => {
    const { tooltipVisible } = this.state;
    if (!tooltipVisible) {
      this.setState({ tooltipVisible: true });
    }
  };

  onMouseLeave = () => {
    this.setState({ tooltipVisible: false });
  };

  onIconClick = () => {
    const { showDropdown } = this.state;

    this.setState({ showDropdown: !showDropdown });
    this.select.focus();
  };

  hideDropdown = () => {
    this.setState({ showDropdown: false });
  };

  render() {
    const {
      icon,
      label,
      onChange,
      selectedKey,
      tooltipTitle,
      values,
      onDropdownVisibleChange,
      small,
    } = this.props;
    const { tooltipVisible, showDropdown } = this.state;

    const smallProps = small
      ? {
          open: small && showDropdown,
          showArrow: false,
          style: {
            marginLeft: -30,
            width: 30,
            zIndex: -1,
          },
          onSelect: this.hideDropdown,
          onBlur: this.hideDropdown,
        }
      : {};

    return (
      <InputGroup compact className={`icon-label-select ${small && 'small'}`}>
        <Tooltip title={tooltipTitle} visible={tooltipVisible}>
          <span
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            onMouseUp={small ? this.onIconClick : undefined}
            className="icon-label-select-span"
          >
            <Button
              style={{ pointerEvents: 'none' }}
              className={`${showDropdown && 'icon-label-select-icon-btn-active'}`}
            >
              {typeof icon === 'string' ? <Icon icon={icon} /> : icon}
            </Button>
          </span>
        </Tooltip>
        <Select
          dropdownClassName="icon-label-select-dropdown small-button-dropdown"
          dropdownMatchSelectWidth={false}
          onChange={onChange}
          onDropdownVisibleChange={onDropdownVisibleChange}
          value={selectedKey}
          {...smallProps}
          ref={(c) => {
            this.select = c;
          }}
        >
          <OptGroup label={label}>
            {values.map((value) => (
              <Option key={value.id} value={value.id}>
                {value.title}
              </Option>
            ))}
          </OptGroup>
        </Select>
      </InputGroup>
    );
  }
}

IconLabelSelect.propTypes = forbidExtraProps({
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onDropdownVisibleChange: PropTypes.func,
  selectedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  tooltipTitle: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.any),
  small: PropTypes.bool,
});

IconLabelSelect.defaultProps = {
  onDropdownVisibleChange: () => {},
  selectedKey: undefined,
  tooltipTitle: '',
  values: [],
};
