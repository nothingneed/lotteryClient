

import {
    ENTER_GAMELIST,
} from './constants';

/**
 * 进入游戏列表
 *
 * @param  {gameType} 游戏类型
 *
 */
export function enterGmaeList(gameType) {
  return {
    type: ENTER_GAMELIST,
    gameType,
  };
}
