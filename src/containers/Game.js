import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {List, ListItem} from 'material-ui/List';
import AppBar from 'material-ui/AppBar';

import FlatButton from 'material-ui/FlatButton';

import {SelectClient,SelectRegion} from '../actions'
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ActionHourglassEmpty from 'material-ui/svg-icons/action/hourglass-empty';


import ActionEvent from 'material-ui/svg-icons/action/event';
import { deepOrangeA400,lime700, cyan400} from 'material-ui/styles/colors';

import AvPlayCircleOutline from 'material-ui/svg-icons/av/play-circle-outline';
import AvPauseCircleOutline from 'material-ui/svg-icons/av/pause-circle-outline';
import Perf from 'react-addons-perf'


import {Link, browserHistory} from 'react-router'

import Divider from 'material-ui/Divider';
class Login extends Component {
    static muiName = FlatButton.muiName;
    render() {
      //  console.log('login render' ,this)
        return (
            <FlatButton {...this.props} label="Login" />
        );
    }
}

const Logged = (props) =>
{
    console.log('Logged constructor')
    return( <FlatButton {...props} label="SU" />)
};

Logged.muiName = 'IconMenu';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400 ,
    },
    appBar: {
            flexWrap: 'wrap',
        width: 500,
    },
    tabs: {
            width: '100%',
    },

};


let gotoDetail = {
    pathname: '/gameDetail/',
    query: {

        dev: 'ios'
    }
}
const MainTabs = (props) =>
{
    const {clients,handleChangeTab ,curRegion} = props
    return(
            <Tabs
                style={styles.tabs}
                onChange={ handleChangeTab}
                value = {curRegion}
            >
            {
                clients.map(client=>(
                    <Tab
                        label={client.name + ' : ' + client.list.length + '台'}
                        value = {client.name}
                        key = {client.name}
                  //      icon={<FontIcon> 111</FontIcon>}

                    >
                    </Tab>
                ))
            }
            </Tabs>
    )
};
const iconStyles = {
    marginRight: 40,
    fontSize:12,
};

const MainList = (props) =>
{
    console.log('MainList',props)
    const {clients,curRegion} = props
    let l


    clients.forEach(client => {
        if (client.name == curRegion) {
            l= client.list.map(e=>
            (
                <div>
                    <ListItem
                        primaryText={`ID:${e.clientId} `}
                        secondaryText={
                            <p>
                                <span >{
                                    (()=>{
                                        if(e.logSize > 1000000){return (`${(e.logSize/1000000).toFixed(2)}MB`)}
                                        else if (e.logSize >1000){return (`${(e.logSize/1000).toFixed(2)}KB`)}
                                        else {return (`${e.logSize}B`)}

                                    })()
                                }</span>
                            <span>{curRegion == '其他'? `------${e.address}:${e.ip}`:`------${e.ip}`}</span>

                            </p>
                        }


                        key = {e.clientId}
                        rightIcon = { (()=> {
                            if (e.dumpTime != '0'){
                                 return <ActionEvent color={deepOrangeA400} />
                            }else if(e.lastOverTime != '0')
                            {return <FontIcon className="material-icons" style={iconStyles} >{ `OT:${e.lastOverTime}`}</FontIcon>  }

                        })()

                        }
                        leftIcon = { (()=>{
                            let interval = ((new Date()).getTime() - e.logStamp)

                            if(interval < 100000){
                                return <AvPlayCircleOutline color={cyan400}/>
                            }else if(interval <600000){
                                return <AvPauseCircleOutline color={lime700}/>
                            }else{
                                return <ActionHourglassEmpty/>
                            }
                        })()}
                       onNestedListToggle={() =>{

                           props.SelectClient(e.clientId)

                           props.router.push(`/gameDetail/${e.clientId}`)
                       }}
                        primaryTogglesNestedList ={true}
                    />
                    <Divider inset={true} />
                </div>
            ))

        }})

    return(
        <List>
            {l}
        </List>
    )
};

class Game extends Component {

    constructor(props){
        super()
        this.state = {
            logged: false,
        };
    }

    handleChange = (event, logged) => {
        this.setState({logged: logged});
    };

    handleChangeTab = (value) =>{
        console.log(value)

        this.props.SelectRegion(value)

    };
    componentWillUpdate()
    {

        Perf.start()

    }
    componentDidUpdate(){


        Perf.stop()
        Perf.printInclusive()
        Perf.printWasted()
    }
    render() {
        console.log('game render')
        const {clients,...other} = this.props

        return(
            <div>
            <AppBar title="AutoPrinter" style={{flexWrap: 'wrap'}}  showMenuIconButton  = {false} iconElementRight=  {<Login />}>
                <MainTabs clients = {clients}  curRegion={this.props.curRegion} handleChangeTab={this.handleChangeTab}/>
            </AppBar>
                <MainList clients = {clients} curRegion={this.props.curRegion} {...other}/>
            </div>
        )

    }
}


// Note: https://github.com/faassen/reselect 提供了此步骤性能优化的范例
function mapStateToProps(state) {
    return {
        clients: state.allClients,
        curRegion:state.curRegion.value

    }
}



export default connect(
    mapStateToProps,
    {
        SelectClient,
        SelectRegion
    }
)(Game)









