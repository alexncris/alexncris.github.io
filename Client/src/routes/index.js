import React                    from 'react';
import {Route, IndexRoute}      from 'react-router';
import CoreLayout               from '../layouts/CoreLayout';
import HomeView                 from '../common/views/HomeView';
import WishlistView             from '../features/wishlist/views/Wishlist';

export default (
	<Route path='/' component={CoreLayout}>
		<IndexRoute component={HomeView}/> 
		<Route path='/wishlist' component={WishlistView}/>
	</Route>
);

