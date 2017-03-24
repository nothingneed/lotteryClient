

import { createSelector } from 'reselect';

const getAll = (state) => state.get('gameList')

const makeSelectGameList = () =>createSelector(
        getAll,
        (gameList) => gameList.get('list')
);

export {
    getAll,
    makeSelectGameList,
};
