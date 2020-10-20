import React, { Component } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';
import frFR from 'antd/es/locale/fr_FR';
import enGB from 'antd/es/locale/en_GB';
import enUS from 'antd/es/locale/en_US';
import itIT from 'antd/es/locale/it_IT';
import ptPT from 'antd/es/locale/pt_PT';
import deDE from 'antd/es/locale/de_DE';
import { childrenPropType } from '../defaultPropTypes';

export default class ConfigProvider extends Component {
  static propTypes = forbidExtraProps({
    ...childrenPropType,
    locale: PropTypes.string,
  });

  static defaultProps = {
    locale: 'enGB',
  };

  state = {
    antdLocale: enGB,
  };

  componentDidUpdate(prevProps) {
    const { locale } = this.props;

    if (prevProps.locale !== locale) {
      const antdLocale = this.mapLocaleToAntdLocale(locale);
      this.setState({ antdLocale });
    }
  }

  mapLocaleToAntdLocale = (locale) => {
    const availableAntdLocales = {
      frFR,
      enGB,
      enUS,
      itIT,
      ptPT,
      deDE,
    };
    return availableAntdLocales[locale] ? availableAntdLocales[locale] : enGB;
  };

  render() {
    const { antdLocale } = this.state;
    return <AntdConfigProvider {...this.props} locale={antdLocale} />;
  }
}
