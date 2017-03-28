import React from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import messages from './messages';
import {loadGameList} from './models/actions';
import {makeSelectGameList, makeSelectPhase} from './selectors';
import {isImmutable, Map, List, Stack} from 'immutable';

export class GameList extends React.PureComponent {
    componentDidMount() {
        this.props.onLoadGameList(this.props.params.gameType);
    }

    render() {

        return (
            <div>
                <Helmet
                    title="Game List"
                />
                <div>
                    <p>
                        { messages.welcomeMessage}
                    </p>
                    <p>
                        {JSON.stringify(this.props.gameList)}
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
