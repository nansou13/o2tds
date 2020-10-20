import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import intl from 'react-intl-universal';
import { Icon as AntdIcon, Select as AntdSelect, Spin, Tooltip } from 'antd';
import Icon from '../icon';

import { SELECT_GROUP_HEADER, BADGE_NULL_VALUE, DM_BADGE_UNDEFINED_VALUE } from './constants';
import propsForOption from './services/optionProps';
import { forgeSelectFieldValue } from './services/dataTransform';
import { unescape } from '../services/dataTransform';
import FormItem from '../formItem';
import OpenInNewTabIcon from './media/openInNewTabIcon';
import './style.less';

class SelectField extends Component {
  isBodyGroupOption = (group) => group !== SELECT_GROUP_HEADER;

  isHeaderGroupOption = (group) => group === SELECT_GROUP_HEADER;

  hasOccurrence = (badge) =>
    badge && badge !== BADGE_NULL_VALUE && badge !== DM_BADGE_UNDEFINED_VALUE;

  handleBlur = () => {
    const { onBlur, unsetFocusedField } = this.props;

    onBlur();
    unsetFocusedField();
  };

  handleChange = (value) => {
    const { onChange } = this.props;
    const fieldValue = forgeSelectFieldValue(value);
    onChange(fieldValue);
  };

  handleFocus = () => {
    const { fieldId, onFocus, setFocusedField } = this.props;

    onFocus();
    setFocusedField(fieldId);
  };

  handleSelect = (value) => {
    const { onSelect } = this.props;
    const fieldValue = forgeSelectFieldValue(value);
    onSelect(fieldValue);
  };

  formatValue = () => {
    const {
      modelValues: { selected },
      multiple,
    } = this.props;

    let formattedValue;
    if (!selected) {
      formattedValue = multiple ? [] : undefined;
    } else {
      formattedValue = selected.map((value) => ({
        key: value.value,
        label: unescape(value.title),
      }));
    }
    return formattedValue;
  };

  renderOptionContent = (IconNode, title, hasOccurrence, badge) => (
    <div className="o2t-select-option">
      {IconNode}
      {unescape(title)}
      {hasOccurrence ? ` (${badge})` : ''}
    </div>
  );

  renderOption = (availableValue, isLast) => {
    let optionClassName = '';
    const { badge, title, group, icon, tooltip } = availableValue;

    const hasBadge = badge !== undefined;
    const hasOccurrence = this.hasOccurrence(availableValue.badge);
    const isHeaderGroupOption = this.isHeaderGroupOption(group);

    if (hasBadge) {
      if (hasOccurrence || isHeaderGroupOption) {
        optionClassName = optionClassName.concat('has-occurrence');
      } else {
        optionClassName = optionClassName.concat('no-occurrence');
      }
    }

    if (isHeaderGroupOption) {
      optionClassName = optionClassName.concat(' header');
    }

    if (isLast) {
      optionClassName = optionClassName.concat(' last');
    }

    return (
      <AntdSelect.Option
        className={optionClassName}
        {...propsForOption({ ...availableValue, title: unescape(availableValue.title) })}
      >
        {tooltip ? (
          <Tooltip placement="top" title={tooltip.title}>
            {this.renderOptionContent(icon, title, hasOccurrence, badge)}
          </Tooltip>
        ) : (
          this.renderOptionContent(icon, title, hasOccurrence, badge)
        )}
      </AntdSelect.Option>
    );
  };

  getOptionsContainerClassName = () => {
    const { infoMessage, newTabUrl } = this.props;

    if (infoMessage && newTabUrl) {
      return 'options-container-multiple';
    }

    return 'options-container-single';
  };

  render() {
    const {
      allowClear,
      autoFocus,
      className,
      defaultOpen,
      disabled,
      filterOption,
      forwardedRef,
      help,
      infoMessage,
      isFetching,
      isRequired,
      label,
      modelValues,
      multiple,
      newTabUrl,
      onSearch,
      placeholder,
      showSearch,
      validateStatus,
    } = this.props;

    const headerValues = modelValues.available
      ? modelValues.available.filter((mv) => this.isHeaderGroupOption(mv.group))
      : [];
    const bodyValues = modelValues.available
      ? modelValues.available.filter((mv) => this.isBodyGroupOption(mv.group))
      : [];

    return (
      <div className={`select-field ${className}`}>
        <FormItem
          label={label}
          help={help}
          required={isRequired}
          validateStatus={validateStatus}
          hasFeedback={!!validateStatus}
        >
          <AntdSelect
            allowClear={allowClear}
            autoFocus={autoFocus}
            className="select-full-width"
            defaultOpen={defaultOpen}
            disabled={disabled}
            dropdownStyle={{ minWidth: '200px' }}
            filterOption={filterOption}
            labelInValue
            mode={multiple ? 'multiple' : 'single'}
            notFoundContent={
              isFetching ? (
                <Spin indicator={<AntdIcon type="loading-3-quarters" spin />} />
              ) : (
                intl.get('NO_CONTENT')
              )
            }
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onSearch={onSearch}
            onSelect={this.handleSelect}
            optionFilterProp="title"
            placeholder={!disabled && placeholder}
            ref={forwardedRef}
            showArrow={!disabled}
            showSearch={showSearch}
            value={this.formatValue()}
          >
            {headerValues.map((headerModelValue, index) => {
              const isLast = index === headerValues.length - 1;
              return this.renderOption(headerModelValue, isLast);
            })}
            {bodyValues.map((bodyModelValue) => this.renderOption(bodyModelValue))}
          </AntdSelect>
        </FormItem>
        <div className={`options-container ${this.getOptionsContainerClassName()}`}>
          {infoMessage && infoMessage.length && (
            <div className="info-message">
              <Tooltip arrowPointAtCenter placement="topRight" title={infoMessage}>
                <span>
                  <Icon className="info-icon" icon="info2" />
                </span>
              </Tooltip>
            </div>
          )}
          {newTabUrl && newTabUrl.length && (
            <Tooltip
              arrowPointAtCenter
              placement="topRight"
              title={intl.get('OPEN_OBJECT_IN_NEW_TAB')}
            >
              <a
                className="open-in-a-new-tab-icon"
                href={newTabUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <OpenInNewTabIcon />
              </a>
            </Tooltip>
          )}
        </div>
      </div>
    );
  }
}

SelectField.propTypes = forbidExtraProps({
  allowClear: PropTypes.bool,
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  defaultOpen: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldId: PropTypes.string,
  filterOption: PropTypes.bool,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  help: PropTypes.string,
  infoMessage: PropTypes.string,
  isFetching: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  modelValues: PropTypes.shape({
    available: PropTypes.arrayOf(
      PropTypes.shape({
        badge: PropTypes.number,
        group: PropTypes.string,
        icon: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        key: PropTypes.string,
        title: PropTypes.string,
      })
    ),
    selected: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        title: PropTypes.string,
      })
    ),
  }).isRequired,
  multiple: PropTypes.bool,
  newTabUrl: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  showSearch: PropTypes.bool,
  setFocusedField: PropTypes.func,
  unsetFocusedField: PropTypes.func,
  validateStatus: PropTypes.string,
});

SelectField.defaultProps = {
  allowClear: false,
  autoFocus: false,
  className: '',
  defaultOpen: false,
  disabled: false,
  fieldId: '',
  filterOption: true,
  forwardedRef: () => {},
  help: null,
  infoMessage: undefined,
  isFetching: false,
  isRequired: false,
  label: '',
  multiple: false,
  newTabUrl: undefined,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  onSearch: () => {},
  onSelect: () => {},
  placeholder: undefined,
  showSearch: false,
  setFocusedField: () => {},
  unsetFocusedField: () => {},
  validateStatus: null,
};

export default React.forwardRef((props, ref) => <SelectField forwardedRef={ref} {...props} />);
