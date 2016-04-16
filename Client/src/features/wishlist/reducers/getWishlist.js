import {createReducer, updateState} from '../../../common/utils';
import GET_WISHLIST from '../constants/getWishlist';

const INITIAL_STATE = {
	isGettingWishlist: false,
	isCompletingWishlistItem: false,
	wishlist: [],
	displayList: [],
	error: ''
}

var _displayList = (wishlist) => {
	var priorityList = [];
	var list = [];

	wishlist.map(item => {
		if(item.priority) {
			priorityList.push(item);
		} else {
			list.push(item);
		}
	})

	priorityList = _sortList(priorityList)
	list = _sortList(list)

	if(list.length > 0) {
		list[0]['split'] = true;
	}

	list.map(item => {
		priorityList.push(item);
	})

	return priorityList;
}

var _sortList = (list) => {
	list.sort(function (a, b) {
	  if (a.name > b.name) {
	    return 1;
	  }
	  if (a.name < b.name) {
	    return -1;
	  }
	  return 0;
	});

	return list;
} 

export default createReducer (INITIAL_STATE,  {
	[GET_WISHLIST.GET_WISHLIST_FAILURE]: (state, error) => updateState(state, {
		isGettingWishlist: false,
		error: error
	}),

	[GET_WISHLIST.GET_WISHLIST_SUCCESS]: (state, wishlist) => updateState(state, {
		wishlist: wishlist,
		displayList: _displayList(wishlist),
		isGettingWishlist: false,
		error:''
	}),

	[GET_WISHLIST.GETTING_WISHLIST]: state => updateState(state, {
		isGettingWishlist: true,
		wishlist: [],
		displayList: [],
		error:''
	}),

	[GET_WISHLIST.COMPLETE_WISHLIST_ITEM_FAILURE]: (state, error) => updateState(state, {
		isCompletingWishlistItem: false,
		error: error
	}),

	[GET_WISHLIST.COMPLETE_WISHLIST_ITEM_SUCCESS]: state => updateState(state, {
		isCompletingWishlistItem: false,
		error:''
	}),

	[GET_WISHLIST.COMPLETING_WISHLIST_ITEM]: state => updateState(state, {
		isCompletingWishlistItem: true,
		error:''
	})
});
