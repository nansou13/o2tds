import React from 'react';
import { Tree as AntdTree } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';
import './style.less';

const Tree = (props) => <AntdTree {...props} />;

Tree.TreeNode = AntdTree.TreeNode;

const antdTreeNodePropTypes = {
  eventKey: PropTypes.string,
  expanded: PropTypes.bool,
  selected: PropTypes.bool,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  checked: PropTypes.bool,
  halfChecked: PropTypes.bool,
  pos: PropTypes.string,
  dragOver: PropTypes.bool,
  dragOverGapTop: PropTypes.bool,
  dragOverGapBottom: PropTypes.bool,
};

Tree.TreeNode.propTypes = forbidExtraProps({
  ...antdTreeNodePropTypes,
  children: PropTypes.node,
  selectable: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
});

Tree.propTypes = forbidExtraProps({
  ...childrenPropType,
  autoExpandParent: PropTypes.bool,
  checkable: PropTypes.bool,
  checkedKeys: PropTypes.arrayOf(PropTypes.string),
  expandedKeys: PropTypes.arrayOf(PropTypes.string),
  filterTreeNode: PropTypes.func,
  onCheck: PropTypes.func,
  onExpand: PropTypes.func,
});

Tree.defaultProps = {
  autoExpandParent: false,
  checkable: false,
  checkedKeys: [],
  expandedKeys: [],
  filterTreeNode: () => {},
  onCheck: () => {},
  onExpand: () => {},
};

export default Tree;
