import React, { PropTypes, Component } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import styles from './GameDetail.css'
//
import {connect} from 'react-redux'
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'



class GameDetail extends Component {

    handleChangeTab = () =>{

    };
	render() {
		console.log('------para',this.props)
		const {allClients} = this.props

		if (!allClients) {return (<div>loading...</div>)}
		let clientInfo
		for (var key in allClients)
		{


			 clientInfo = allClients[key].list.find((e => {
				 		console.log('mapdetail----------eee', e)
				 		return (e.clientId == this.props.match.params.clientID)
				 	}))
			if (clientInfo) {break}

		}
		if (!clientInfo) {return (<div>loading...</div>)}
		console.log('title',clientInfo)
		let dumpTime = clientInfo.dumpTime == '0'?<div></div>:<p>dump文件生成时间: {new Date(clientInfo.dumpTime*1000).toLocaleString()} </p>
		return(
			<MuiThemeProvider>
			<div>
				<AppBar title={clientInfo.clientId}
                    iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>}
                    onLeftIconButtonTouchTap={() => this.props.history.goBack()}
                />
				<p className={styles.gameItem} >
                    {/*<p style={{display: 'flex',justifyContent:  'space-between'}} >*/}
                    <span>version: {clientInfo.version}</span> <span>Id Stamp: {clientInfo.idStamp}</span></p>
				<p> Log Stamp: {new Date(clientInfo.logStamp).toLocaleString()} </p>

				{dumpTime}
				<Divider />

				<TextField
					defaultValue="dumpSize"
					floatingLabelText="Dump from"
				/>
				<TextField
					defaultValue="8000"
					floatingLabelText="Dump size"
				/>
				<TextField
					defaultValue={clientInfo.logSize}
					floatingLabelText="LogSize"
				/>
				<Slider
					min={0}
					max={clientInfo.logSize}
					step={100}
					defaultValue={clientInfo.logSize}

				/>
			</div>
				</MuiThemeProvider>
			)
	}
}

function getCurClientInfo(state)
{


		state.allClients.find(e => {
			console.log('mapdetail----------eee', e)

			 	return (e.clientId == state.curClient.clientId)

		})

}

// Note: https://github.com/faassen/reselect 提供了此步骤性能优化的范例
function mapStateToProps(state) {

	// console.log('mapdetail', state)
	// let clientID = this.props.params.clientID;
	// let a = state.allClients.find(e => e.name == state.curRegion.value)
	// console.log(a)
	// let clientInfo=	a.list.find(e => {
	// 		console.log('mapdetail----------eee', e)
	// 		return (e.clientId == state.curClient.clientId)
	// 	})
    //
	// console.log(clientInfo)
	return {
		allClients :state.allClients
	}

}

export default connect(
	mapStateToProps
)(GameDetail)




