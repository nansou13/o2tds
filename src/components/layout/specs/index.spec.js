import React from 'react';
import { mount, shallow } from 'enzyme';
import { Layout, Content } from '..';

describe('Layout', () => {
  let wrapper;

  test('should render Antd Layout', () => {
    wrapper = shallow(<Layout>children</Layout>);

    expect(wrapper.html()).toBe('<section class="ant-layout">children</section>');
  });

  test('should render Antd Layout and Content', () => {
    wrapper = mount(
      <Layout>
        <Content>Test Content</Content>
      </Layout>
    );

    expect(wrapper.find('Layout').exists()).toEqual(true);
    expect(wrapper.find('Content').exists()).toEqual(true);
    expect(wrapper.text()).toEqual('Test Content');
  });
});
