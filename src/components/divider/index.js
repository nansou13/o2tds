import React from 'react';
import { Divider as AntDivider } from 'antd';
import './style.less';

export const Divider = (props) => <AntDivider {...props} />;

export default React.memo(Divider);
