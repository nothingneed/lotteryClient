/*
 * 落地页/首页
 */

import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLogin, makeSelectUserName } from 'containers/App/selectors';
import messages from './messages';
import { needLogin  } from '../App/models/actions';
import { Link } from 'react-router';

export class HomePage extends React.PureComponent {
  render() {
    const { login, userName } = this.props;

    return (
        <div>
            <Helmet
                title="Home Page"
            />
            <div>
                <p>
                    {login ? messages.userName + userName :
                        messages.notLogged}
                </p>
                <p>
                    <Link to="/gameList/jczq_spf"> 足球胜平负</Link>
                </p>
                <p>
                    <Link to="/gameList/jczq_spf_plus"> 单关加奖</Link>'

                </p>

            </div>
        </div>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
  };
}

const mapStateToProps = createStructuredSelector({
    login:makeSelectLogin(),
    userName: makeSelectUserName()
});


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
