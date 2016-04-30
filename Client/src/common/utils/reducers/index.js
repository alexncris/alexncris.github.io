import {combineReducers}      from 'redux';
import {routerStateReducer}   from 'redux-router';
import auth       			  from '../../auth/reducers/auth';
import getWishlist			  from '../../../features/wishlist/reducers/getWishlist';
import addWishlistItem		  from '../../../features/wishlist/reducers/addWishlistItem';
import changes				  from '../../../features/changes/reducers/changes';
import calendar				  from '../../../features/calendar/reducers/calendar';

export default combineReducers({
	auth,
	addWishlistItem,
	getWishlist,
	changes,
	calendar,
	router: routerStateReducer
});
