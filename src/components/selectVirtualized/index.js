import React from 'react';
import Select from 'react-virtualized-select';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { domPropTypes } from '../defaultPropTypes';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';

const SelectVirtualized = React.forwardRef((props, ref) => <Select {...props} ref={ref} />);

SelectVirtualized.propTypes = forbidExtraProps({
  ...domPropTypes,
  arrowRenderer: PropTypes.func,
  autosize: PropTypes.bool,
  clearable: PropTypes.bool,
  maxHeight: PropTypes.number,
  noResultsText: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape()),
  filterOptions: PropTypes.func,
  optionHeight: PropTypes.number,
  optionRenderer: PropTypes.func,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  simpleValue: PropTypes.bool,
  style: PropTypes.shape(),
  value: PropTypes.string,
  openOnFocus: PropTypes.bool,
  autoBlur: PropTypes.bool,
});

SelectVirtualized.defaultProps = {
  arrowRenderer: undefined,
  autosize: false,
  clearable: false,
  filterOptions: () => {},
  maxHeight: 200,
  noResultsText: null,
  options: [],
  optionHeight: 35,
  optionRenderer: null,
  placeholder: null,
  searchable: false,
  simpleValue: false,
  style: {},
  value: null,
  openOnFocus: false,
  autoBlur: true,
};

export default SelectVirtualized;
