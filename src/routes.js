// 在这个文件中配置路由,sagas, reducer的动态加载
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    // create reusable async injectors using getAsyncInjectors factory
    const { injectReducer, injectSagas } = getAsyncInjectors(store);

    return [
        {
            path: '/gamelist/:gameType',
            name: 'gameList',
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
        }, {
            path: '/features',
            name: 'features',
            // getComponent(nextState, cb) {
            //     import('containers/FeaturePage')
            //         .then(loadModule(cb))
            //         .catch(errorLoading);
            // },
        }, {
            path: '*',
            name: 'notfound',
            // getComponent(nextState, cb) {
            //     import('containers/NotFoundPage')
            //         .then(loadModule(cb))
            //         .catch(errorLoading);
            // },
        },
    ];
}
