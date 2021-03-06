import React          from 'react';
import ReactDOM       from 'react-dom';
import Root           from './containers/Root';
import configureStore from './store/rootStore';

const target = document.getElementById('main');
const store = configureStore(window.__INITIAL_STATE__);

const node = (
	<Root store={store}/>
);
ReactDOM.render(node, target);