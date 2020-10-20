import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { EllipsisTooltip } from '../../../../components';
import { SortableElement } from 'react-sortable-hoc';
import DragIcon from './media/dragIcon';
import './style.less';

const SHORT_FORMAT = 'L'; // Moment date format for dd/MM/yyyy

const DragHandle = () => (
  <div className="widget-item-drag-handle">
    <DragIcon />
  </div>
);

const WidgetItem = SortableElement((props) => {
  const { disabledDnd, item, onItemClick, sort } = props;
  const { description, fields, title, type, icon } = item;
  const Icon = lazy(() =>
    import(/* webpackChunkName: "WidgetItemIcon" */ `./media/${type || 'document'}Icon`)
  );

  const sortField = fields[sort];

  const renderSortField = () => {
    const sortDate = moment(sortField);
    if (sortField && sortDate.isValid()) {
      return sortDate.format(SHORT_FORMAT);
    }
    return sortField;
  };

  const onClick = () => onItemClick(item);

  const descriptionText = Array.isArray(description)
    ? description.filter((desc) => !!desc).join(' • ')
    : description;

  return (
    <div className="widget-item" onClick={onClick}>
      <div className="widget-item-icon">
        <Suspense fallback={<div />}>
          {!type && icon ? icon : <Icon />}
        </Suspense>
      </div>
      <EllipsisTooltip className="widget-item-title" title={title}>
        {title}
        {descriptionText && <div className="widget-item-description">{descriptionText}</div>}
      </EllipsisTooltip>
      <div className="widget-item-attributes-container">
        <div className="widget-item-attribute">{renderSortField()}</div>
      </div>
      {!disabledDnd && <DragHandle />}
    </div>
  );
});

WidgetItem.propTypes = {
  disabledDnd: PropTypes.bool,
  item: PropTypes.shape({
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    fields: PropTypes.shape(),
    title: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.node,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
  sort: PropTypes.string,
};

WidgetItem.defaultProps = {
  disabledDnd: true,
  sort: '',
};

export default WidgetItem;
