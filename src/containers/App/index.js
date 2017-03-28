/**
 *
 * App
 * APP容器组件,这个组件只能包含整个app生命周期都可见的组件,比如header,用户登录状态等
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import withProgressBar from 'components/ProgressBar';
import styles from './styles.css';


export function App(props) {
  return (
    <div className = {styles.app} >
      <Helmet
        titleTemplate="%s - 8win lottery"
        defaultTitle="8win lottery"
        meta={[
          { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1' },
        ]}
      />
      {React.Children.toArray(props.children)}
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
