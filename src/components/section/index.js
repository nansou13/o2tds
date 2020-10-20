import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import { childrenPropType } from '../defaultPropTypes';
import { Collapse, Panel } from '../collapse';
import { Layout, Content } from '../layout';
import Icon from '../icon';
import './style.less';

const Section = (props) => {
  const { children, defaultOpen, icon, id, onCollapseChange, theme, title } = props;

  const renderHeader = () => (
    <React.Fragment>
      <div className={`section-icon ${theme}`}>
        <Icon icon={icon} />
      </div>
      <h3>{title}</h3>
    </React.Fragment>
  );

  const onChange = (openPanels) => {
    onCollapseChange(id, !openPanels.length);
  };
  return (
    <Collapse
      className="section"
      activeKey={defaultOpen ? [id] : []}
      defaultActiveKey={defaultOpen ? id : ''}
      onChange={onChange}
    >
      <Panel header={renderHeader()} key={id}>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Panel>
    </Collapse>
  );
};

Section.propTypes = forbidExtraProps({
  ...childrenPropType,
  defaultOpen: PropTypes.bool,
  icon: PropTypes.string,
  id: PropTypes.string.isRequired,
  onCollapseChange: PropTypes.func,
  theme: PropTypes.oneOf(['blue', 'yellow']),
  title: PropTypes.string.isRequired,
});

Section.defaultProps = {
  defaultOpen: true,
  icon: undefined,
  theme: 'blue',
  onCollapseChange: () => {},
};

export default Section;
