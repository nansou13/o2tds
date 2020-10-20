import React from 'react';
import intl from 'react-intl-universal';
import { forbidExtraProps } from 'airbnb-prop-types';
import Empty from 'antd/es/empty';
import range from 'lodash/range';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import { Button } from 'antd';
import Skeleton from '../skeleton';
import WidgetItem from './components/WidgetItem';
import './style.less';

const ObjectListWidgetSkeleton = () => (
  <div>
    {range(5).map((value) => (
      <Skeleton
        avatar={{ shape: 'square' }}
        className="widget-list-skeleton"
        key={value}
        paragraph={false}
        title={{ width: '100%' }}
      />
    ))}
  </div>
);

const renderShowMore = (onShowMore) => (
  <Button className="widget-list-show-more" type="link" onClick={onShowMore}>
    {intl.get('SHOW_MORE')}
  </Button>
);

const ObjectListWidget = (props) => {
  const { disabledDnd, items, loading, onShowMore, onItemClick, sort, emptyDisplay } = props;

  if (!loading && !items.length) {
    return (
      <div className="widget-empty-list">
        {emptyDisplay || (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={intl.get('PLACEHOLDER_WIDGET_LIST')}
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="widget-list">
        {items.map((item, index) => (
          <WidgetItem
            disabled={disabledDnd}
            disabledDnd={disabledDnd}
            index={index}
            item={item}
            key={item.id || item.cardUri}
            onItemClick={onItemClick}
            sort={sort}
          />
        ))}
      </div>
      {loading && <ObjectListWidgetSkeleton />}
      {!loading && onShowMore && renderShowMore(onShowMore)}
    </div>
  );
};

ObjectListWidget.propTypes = forbidExtraProps({
  disabledDnd: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      cardUri: PropTypes.string,
      fields: PropTypes.shape(),
      icon: PropTypes.node,
      path: PropTypes.string,
      title: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onShowMore: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  onItemClick: PropTypes.func.isRequired,
  sort: PropTypes.string,
  // eslint-disable-next-line react/no-unused-prop-types
  distance: PropTypes.number,
  emptyDisplay: PropTypes.node,
});

ObjectListWidget.defaultProps = {
  disabledDnd: true,
  items: [],
  loading: false,
  onShowMore: undefined,
  sort: '',
  distance: 0,
  emptyDisplay: false,
};

export default SortableContainer(ObjectListWidget);
