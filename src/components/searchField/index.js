import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { domPropTypes } from '../defaultPropTypes';

import './style.less';

const { Search } = Input;

const SearchField = (props) => <Search {...props} />;

SearchField.propTypes = forbidExtraProps({
  ...domPropTypes,
  autoFocus: PropTypes.bool,
  enterButton: PropTypes.oneOfType([PropTypes.shape(), PropTypes.bool]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onSearch: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  suffix: PropTypes.node,
  className: PropTypes.string,
});

SearchField.defaultProps = {
  autoFocus: false,
  enterButton: false,
  onBlur: () => {},
  onFocus: () => {},
  onSearch: () => {},
  placeholder: '',
  value: '',
  suffix: null,
};

export default SearchField;
