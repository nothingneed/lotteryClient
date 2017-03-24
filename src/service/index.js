import request from './request'
import _gamelist from '../api'
import * as DIC from '../constants/businessDictionary'

const requestUrl = process.env.REQUEST_PATH

export function requestGameList(gameType) {
    switch (gameType)
    {
        case DIC.GAMETYPE.JCZQ_SPF_PLUS:

            console.log(`request DIC.GAMETYPE.JCZQ_SPF_PLUS`)
            break;
        default:
            break;
    }
    //return request(requestUrl)
    console.log(`request to: ${requestUrl} + ${_gamelist}`)
    return _gamelist.data.dataList
}
