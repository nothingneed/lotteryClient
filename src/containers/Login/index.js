/*
 * 登录页
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLogin, makeSelectUserName } from 'containers/App/selectors';
import messages from './messages';
import { login ,changeLoginPhoneNumber } from './models/actions';
import { Link } from 'react-router';

export class HomePage extends React.PureComponent {
  render() {
    const { login, userName } = this.props;

    return (
        <div>
            <Helmet
                title="Login"
            />
            <div>
                <form  onSubmit={this.props.onLogin}>
                    <p>{messages.enterUserName}</p>
                <input
                    id="userName"
                    type="text"
                    placeholder={messages.userName}
                    onChange={this.props.onChangeLoginPhoneNumber}
                />
                </form>

            </div>
        </div>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
      onChangeLoginPhoneNumber: (evt) => dispatch(changeLoginPhoneNumber(evt.target.value)),
      onLogin: (evt) => {
          if (evt !== undefined && evt.preventDefault) evt.preventDefault();
          dispatch(login());
      },
  };
}

const mapStateToProps = createStructuredSelector({

});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
