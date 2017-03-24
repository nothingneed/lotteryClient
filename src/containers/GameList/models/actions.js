

import {
    LOAD_GAMELIST,
    LOAD_GAMELIST_SUCCESS,
    LOAD_GAMELIST_ERROR
} from './constants';

/**
 * 请求按照游戏类型载入游戏列表
 *
 * @param  {gameType} 游戏类型
 *
 */
export function loadGameList(gameType) {
  return {
    type: LOAD_GAMELIST,
    gameType,
  };
}
/**
 * 游戏列表载入成功
 *
 * @param  {gameType} 游戏类型
 * @param  {gameList} 游戏列表
 */
export function gameListLoaded(gameList,gameType) {
    return {
        type: LOAD_GAMELIST_SUCCESS,
        gameList,
        gameType
    };
}
/**
 * 游戏列表载入失败
 *
 * @param  {gameType} 游戏类型
 *
 */
export function gameListLoadingError(error) {
    return {
        type: LOAD_GAMELIST_ERROR,
        error,
    };
}
