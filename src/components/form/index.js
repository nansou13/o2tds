import React from 'react';
import { Form as AntdForm } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';

const Form = (props) => <AntdForm {...props} />;

Form.propTypes = forbidExtraProps({
  ...childrenPropType,
  layout: PropTypes.string.isRequired,
});

export default Form;
