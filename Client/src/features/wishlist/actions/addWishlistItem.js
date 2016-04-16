import {checkCreated, constructRequest, POST} from '../../../common/utils/fetchUtils';
import fetch from 'isomorphic-fetch';
import ERRORS from '../../../common/constants/errors';
import ADD_WISHLIST_ITEM from '../constants/addWishlistItem';
import getWishlistActions from './getWishlist';
import {valueFromEvent} from '../../../common/utils';

function _changeName(e) {
	return {
		type: ADD_WISHLIST_ITEM.CHANGE_NAME,
		payload: valueFromEvent(e)
	};
}

function _changePriority(priority) {
	return {
		type: ADD_WISHLIST_ITEM.CHANGE_PRIORITY,
		payload: priority
	};
}

function _changeUrl(e) {
	return {
		type: ADD_WISHLIST_ITEM.CHANGE_URL,
		payload: valueFromEvent(e)
	};
}

function _changeCost(e) {
	return {
		type: ADD_WISHLIST_ITEM.CHANGE_COST,
		payload: valueFromEvent(e)
	};
}

function _addingWishlistItem() {
	return {
		type: ADD_WISHLIST_ITEM.ADDING_WISHLIST_ITEM
	};
}

function _addWishlistItemSuccess() {
	return {
		type: ADD_WISHLIST_ITEM.ADD_WISHLIST_ITEM_SUCCESS
	};
}

function _addWishlistItemFailure(error) {
	return {
		type: ADD_WISHLIST_ITEM.ADD_WISHLIST_ITEM_FAILURE,
		payload: error
	};
}

function _addWishlistItem() {
	return (dispatch, getState) => {
		var state = getState();
		var addWishlistItemState = state.addWishlistItem;

		if (!addWishlistItemState.name || !addWishlistItemState.url) {
			return dispatch(_addWishlistItemFailure(ERRORS.NO_EMPTY_FIELDS));
		}

		var obj = {
			name: addWishlistItemState.name,
			url: addWishlistItemState.url,
			priority: addWishlistItemState.priority,
			cost: addWishlistItemState.cost
		};

		var req = constructRequest(state, 'wishlist', POST, obj);

		dispatch(_addingWishlistItem())

        var success = false;

	    fetch(req)
	   	   .then(checkCreated)
	       .then(() => {
	      	  success = true;
	      	  dispatch(_addWishlistItemSuccess());
	      	  dispatch(getWishlistActions.getWishlist());
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 400 ?  ERRORS.BAD_REQUEST : error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_addWishlistItemFailure(text)));

	};
}

export default {
  addWishlistItem: _addWishlistItem,
  changeUrl: _changeUrl,
  changeName: _changeName,
  changePriority: _changePriority,
  changeCost: _changeCost
};