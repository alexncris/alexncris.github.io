import rootReducer          from '../common/utils/reducers';
import {reduxReactRouter}   from 'redux-router';
import routes               from '../routes';
import createHashHistory        from 'history/lib/createHashHistory';
import thunk                from 'redux-thunk';

import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

function useNoQueryKey(createHistory) {
  return function(options={}) {
    options.queryKey = false;
    return createHistory(options);
  };
}

export default function configureStore(initialState) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);

  createStoreWithMiddleware = compose(
  	middleware,
    reduxReactRouter({
      routes, 
      createHistory: useNoQueryKey(createHashHistory)
    })
   );

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );

  return store;
}
