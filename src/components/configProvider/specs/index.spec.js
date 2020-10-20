import React from 'react';
import { shallow } from 'enzyme';
import frFR from 'antd/es/locale/fr_FR';
import enGB from 'antd/es/locale/en_GB';
import ConfigProvider from '..';

describe('ConfigProvider', () => {
  let props;
  let wrapper;
  beforeEach(() => {
    props = {
      locale: 'enGB',
    };
    wrapper = shallow(
      <ConfigProvider {...props}>
        <div className="content" />
      </ConfigProvider>
    );
  });

  test('should render children prop', () => {
    expect(wrapper.find('.content').exists()).toBe(true);
  });

  test('mapLocaleToAntdLocale should return antd locale resource according to locale', () => {
    const andtLocale = wrapper.instance().mapLocaleToAntdLocale('frFR');

    expect(andtLocale).toEqual(frFR);
  });

  test("mapLocaleToAntdLocale should return antd enGB locale resource if there isn't any corresponding resource", () => {
    const andtLocale = wrapper.instance().mapLocaleToAntdLocale('not exist');

    expect(andtLocale).toEqual(enGB);
  });

  test('should call mapLocaleToAntdLocale and update component state when locale prop changes', () => {
    const mapLocaleToAntdLocaleSpy = jest.spyOn(wrapper.instance(), 'mapLocaleToAntdLocale');

    wrapper.setProps({ locale: 'frFR' });

    expect(mapLocaleToAntdLocaleSpy).toHaveBeenCalledWith('frFR');
    expect(wrapper.state('antdLocale')).toEqual(frFR);
  });
});
