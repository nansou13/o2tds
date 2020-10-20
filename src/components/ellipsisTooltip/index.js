import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import { domPropTypes } from '../defaultPropTypes';
import './style.less';

const EllipsisTooltip = ({ title, children, className, contentClassName, mouseEnterDelay }) => {
  const divRef = React.createRef();
  const isOverflowed = () =>
    divRef.current ? divRef.current.scrollWidth > divRef.current.clientWidth : true;
  const [overflowed, setOverflowed] = React.useState(isOverflowed);
  const mouseEnterFn = () => setOverflowed(isOverflowed());
  const displayContent = () => (
    <div ref={divRef} className={`${contentClassName} ellipsis-content`}>
      {children || title}
    </div>
  );

  return (
    <div onMouseEnter={mouseEnterFn} className={`${className} ellipsis-tooltip`}>
      {overflowed ? (
        <Tooltip placement="top" title={title} mouseEnterDelay={mouseEnterDelay}>
          {displayContent()}
        </Tooltip>
      ) : (
        displayContent()
      )}
    </div>
  );
};

EllipsisTooltip.propTypes = {
  ...domPropTypes,
  title: PropTypes.string,
  mouseEnterDelay: PropTypes.number,
};

EllipsisTooltip.defaultProps = {
  mouseEnterDelay: 0.1,
  title: '',
};

export default EllipsisTooltip;
