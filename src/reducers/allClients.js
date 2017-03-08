import {
    CLIENTLIST_SUCCESS,
    SET_CURRENT_CLIENT,
    SET_CURRENT_REGION
} from '../constants/ActionTypes'
import { INIT } from 'redux'

function filterClientInfo(list){

    console.log(list.length)
    let regionHN = {
        name:'海南',
        list:[]
    }
    let regionSX = {
        name:'陕西',
        list:[]
    }
    let regionOther = {
        name:'其他',
        list:[]
    }
    let clients = [regionHN,regionSX,regionOther]
    list.forEach( e => {
        switch (e.address){
            case '海南省':
                regionHN.list.push(e)
                break
            case '陕西省':
                regionSX.list.push(e)
                break
            default:
                regionOther.list.push(e)
                break

        }})
    clients.forEach(e=>{
        e.list.sort((l1,l2)=>(l1.clientId > l2.clientId ? 1:-1))

    })
    return clients

}
export const allClients = (state = [], action) => {

    switch (action.type) {

        case CLIENTLIST_SUCCESS:
            return filterClientInfo(action.list)

        default:
            return state
    }
}
export const curClient = (state = {}, action) => {

    switch (action.type) {

        case SET_CURRENT_CLIENT:

            return Object.assign({}, state, {
                clientId: action.id,
            })
        default:
            return state
    }
}
export const curRegion = (state = {}, action) => {
console.log('nonameaction',action)
    switch (action.type) {

        case SET_CURRENT_REGION:

            return Object.assign({}, state, {
                value: action.region,
            })
        case '@@redux/INIT':
            return Object.assign({}, state, {
                value: "海南",
            })

        default:

            return state
    }
}

