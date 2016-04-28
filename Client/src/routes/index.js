import React                    from 'react';
import {Route, IndexRoute}      from 'react-router';
import CoreLayout               from '../layouts/CoreLayout';
import WishlistView             from '../features/wishlist/views/Wishlist';
import CalendarView             from '../features/calendar/views/Calendar';

export default (
	<Route path='/' component={CoreLayout}>
		<Route path='wishlist' component={WishlistView}/>
		<Route path='calendar' component={CalendarView}/>
	</Route>
);

