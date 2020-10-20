import React from 'react';
import { Modal as AntdModal } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';
import './style.less';

export const info = ({ title, okText, onOk }) => {
  AntdModal.info({ title, okText, onOk });
};

export const confirm = ({
  cancelText,
  content,
  icon,
  maskClosable = true,
  onCancel,
  onOk,
  okText,
  okType,
  style,
  title,
  zIndex,
}) =>
  AntdModal.confirm({
    autoFocusButton: null,
    cancelText,
    maskClosable,
    content,
    okText,
    okType,
    onCancel,
    onOk,
    style,
    title,
    zIndex,
    icon,
  });

export const warning = ({ title, content, okText, onOk, icon }) =>
  AntdModal.warning({
    title,
    content,
    okText,
    onOk,
    icon,
  });

export const error = ({ title, content }) =>
  AntdModal.error({
    title,
    content,
  });

const Modal = (props) => <AntdModal {...props} />;

const antdModalPropTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  okText: PropTypes.string,
  okButtonProps: PropTypes.shape(),
  cancelText: PropTypes.string,
  content: PropTypes.string,
};

Modal.propTypes = forbidExtraProps({
  ...childrenPropType,
  ...antdModalPropTypes,
  centered: PropTypes.bool,
  className: PropTypes.string,
  destroyOnClose: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.any), PropTypes.shape()]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  visible: PropTypes.bool,
  width: PropTypes.number,
});

Modal.defaultProps = {
  centered: false,
  className: '',
  destroyOnClose: false,
  footer: null,
  visible: false,
  width: 520,
};

export default Modal;
