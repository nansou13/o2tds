import React from 'react';
import { Input, Button, Select, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import Icon from '../icon';
import './style.less';

const InputGroup = Input.Group;
const { Option } = Select;

const IconSelect = (props) => {
  const { onChange, selectedKey, values, small, tooltipTitle } = props;

  return (
    <div className="icon-select-wrapper">
      <Tooltip title={tooltipTitle}>
        <Select
          className="icon-select"
          dropdownClassName="icon-select-dropdown"
          dropdownMatchSelectWidth={false}
          onChange={onChange}
          value={selectedKey}
          showArrow={!small}
          style={{ width: small && 36 }}
        >
          {values.map((value) => (
            <Option value={value.id} key={value.id}>
              <InputGroup compact style={{ marginRight: !small && 26 }}>
                <Button style={{ pointerEvents: 'none', marginRight: !small && 11 }}>
                  <Icon icon={value.icon} />
                </Button>
                <div className="icon-select-option-title">{value.title}</div>
              </InputGroup>
            </Option>
          ))}
        </Select>
      </Tooltip>
    </div>
  );
};

IconSelect.propTypes = forbidExtraProps({
  small: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  selectedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
  tooltipTitle: PropTypes.string,
});

IconSelect.defaultProps = {
  selectedKey: undefined,
};

export default IconSelect;
