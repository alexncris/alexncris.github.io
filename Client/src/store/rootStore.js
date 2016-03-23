import rootReducer          from '../common/utils/reducers';
import {reduxReactRouter}   from 'redux-router';
import routes               from '../routes';
import createHistory        from 'history/lib/createBrowserHistory';
import thunk                from 'redux-thunk';

import {
  applyMiddleware,
  compose,
  createStore
} from 'redux';

export default function configureStore(initialState) {
  let createStoreWithMiddleware;
  const middleware = applyMiddleware(thunk);

  createStoreWithMiddleware = compose(
  	middleware,
    reduxReactRouter({
      routes, 
      createHistory
    })
   );

  const store = createStoreWithMiddleware(createStore)(
    rootReducer, initialState
  );

  return store;
}
