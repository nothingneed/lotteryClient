
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import messages from './messages';
import { loadGameList } from './models/actions';
import { makeSelectGameList, makeSelectPhase } from './selectors';
import { isImmutable, Map, List, Stack } from 'immutable';

export class GameList extends React.PureComponent {
  componentDidMount() {
      console.log("GameList.props", this.props)
      this.props.onLoadGameList(this.props.params.gameType);
  }

  render() {
    //const {   } = this.props;
    console.log(`gamelist ${this.props.gameList}`)
      console.log(`gamelist ${List.isList(this.props.gameList)}`)
    return (
      <div>
        <Helmet
          title="Game List"
        />
        <div>
            <p>
              { messages.welcomeMessage}
            </p>

        </div>
      </div>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
      onLoadGameList: (evt) => dispatch(loadGameList(evt)),

    }
}

const mapStateToProps = createStructuredSelector({
   gameList: makeSelectGameList(),

});


export default connect(mapStateToProps, mapDispatchToProps)(GameList);
