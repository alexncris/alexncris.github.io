import {checkStatus, constructRequest, parseBody, DELETE} from '../../../common/utils/fetchUtils';
import fetch from 'isomorphic-fetch';
import ERRORS from '../../../common/constants/errors';
import GET_WISHLIST from '../constants/getWishlist';

function _gettingWishlist() {
	return {
		type: GET_WISHLIST.GETTING_WISHLIST
	};
}

function _getWishlistSuccess(wishlist) {
return {
		type: GET_WISHLIST.GET_WISHLIST_SUCCESS,
		payload: wishlist
	};
}

function _getWishlistFailure(error) {
	return {
		type: GET_WISHLIST.GET_WISHLIST_FAILURE,
		payload: error
	};
}

function _completingWishlistItem() {
	return {
		type: GET_WISHLIST.COMPLETING_WISHLIST_ITEM
	};
}

function _completeWishlistItemSuccess() {
	return {
		type: GET_WISHLIST.COMPLETE_WISHLIST_ITEM_SUCCESS
	};
}

function _completeWishlistItemFailure(error) {
	return {
		type: GET_WISHLIST.COMPLETE_WISHLIST_ITEM_FAILURE,
		payload: error
	};
}

function _completeWishlistItem(itemId) {
	return (dispatch, getState) => {
		var state = getState();		
		var req = constructRequest(state, `wishlist/${itemId}`, DELETE);
		dispatch(_completingWishlistItem())

	    var success = false;

	    fetch(req)
	   	   .then(checkStatus)
	       .then(() => {
	      	  success = true;
	      	  dispatch(_completeWishlistItemSuccess());
	      	  dispatch(_getWishlist());
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 401 ? ERRORS.BAD_CREDENTIALS : 
	      		 	error.response.status === 400 ?  error.response.text(): error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_completeWishlistItemFailure(text)));
	};
}

function _getWishlist() {
	return (dispatch, getState) => {
		var state = getState();		
		var req = constructRequest(state, 'wishlist');

		dispatch(_gettingWishlist())

        var success = false;

	    fetch(req)
	   	   .then(checkStatus)
	   	   .then(parseBody)
	       .then((body) => {
	      	  success = true;
	      	  dispatch(_getWishlistSuccess(body));
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 401 ? ERRORS.BAD_CREDENTIALS : 
	      		 	error.response.status === 400 ?  error.response.text(): error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_getWishlistFailure(text)));

	};
}

export default {
  getWishlist: _getWishlist,
  completeWishlistItem: _completeWishlistItem
};