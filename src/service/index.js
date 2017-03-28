import request from './request'
import _gamelist from '../api'
import * as DIC from '../constants/businessDictionary'

const requestUrl = process.env.REQUEST_PATH

export function requestGameList(gameType) {
    let ret
    switch (gameType)
    {
        case DIC.GAMETYPE.JCZQ_SPF_PLUS:
        case DIC.GAMETYPE.JCZQ_SPF:
            ret = _gamelist.data.dataList

            break;
        default:
            break;
    }
    //return request(requestUrl)
   // console.log(`request to: ${requestUrl} and return ${JSON.stringify(ret)}`)
    return ret
}
export function requestLogin(authInfo) {

    const ret = {
        userName :  "dummy"
    }
    return ret
}
