// 在这个文件中配置路由,sagas, reducer的动态加载
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';
import { makeSelectLogin  } from 'containers/App/selectors';


const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err);
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

const checkAuthed = store => {
    return (nextState, replace) => {
        console.log('checkAuthed')
        let { location: { query } } = nextState
        if (makeSelectLogin()(store.getState())) replace({ pathname: query && query.return_to || '/' })
    }
}

const requireAuth = store => {
    return (nextState, replace) => {
        if (!makeSelectLogin()(store.getState()))
            replace({ pathname: '/login', query: { return_to: nextState.location.pathname } })
    }
}
export default function createRoutes(store) {
    const { injectReducer, injectSagas } = getAsyncInjectors(store);

    return [
        {
            // 这里还需要二次封装
            path: '/gamelist/:gameType',
            name: 'gameList',
            onEnter : requireAuth(store),
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                import('containers/GameList/models/reducer'),
                import('containers/GameList/models/sagas'),
                import('containers/GameList'),
            ]);

                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                     injectReducer('gameList', reducer.default); //此页面的根reducer名字
                     injectSagas(sagas.default);
                     renderRoute(component);
                });
                importModules.catch(errorLoading);
            },
        },  {
            path: '/login',
            name: 'login',
            onEnter : checkAuthed(store),
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                import('containers/Login/models/reducer'),
                import('containers/Login/models/sagas'),
                import('containers/Login'),
            ]);

                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('login', reducer.default);
                    injectSagas(sagas.default);
                    renderRoute(component);
                });
                importModules.catch(errorLoading);
            },

        },{
            path: '*',
            name: 'homePage',
            getComponent(nextState, cb) {
                import('containers/HomePage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ];
}
