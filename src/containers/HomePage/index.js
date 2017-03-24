/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectRepos, makeSelectLoading, makeSelectError } from 'containers/App/selectors';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { enterGmaeList } from './actions';
import { makeSelectUsername } from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    //如果有需要页面渲染后立刻自动触发的action,放在这里,但此action不应该引起渲染本组件
  }

  render() {
    const { loading, error, repos } = this.props;

    return (
      <div>
        <Helmet
          title="Home Page"
        />
        <div>
            <p>
              {messages.welcomeMessage} />
            </p>

        </div>
      </div>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onEnterShuangSeQiu: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
