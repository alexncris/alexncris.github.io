import {createReducer, updateState} from '../../../common/utils';
import ADD_WISHLIST_ITEM from '../constants/addWishlistItem';

const urlRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
const costRegex = /^\$?\d+(,\d{3})*(\.\d*)?$/;
const urlCheck = new RegExp(urlRegex);
const costCheck = new RegExp(costRegex);

const INITIAL_STATE = {
	isAddingWishlistItem: false,
	isWishlistItemAdded: false,
	isValidUrl: false,
	isValidCost: false,
	name: '',
	url: '',
	cost: '',
	priority: false,
	error: ''
}

var checkValidCost = (cost) => {
	if(cost.match(costCheck)) {
		return true;
	} else {
		return false;
	}
}

var checkValidUrl = (url) => {
	if(url.match(urlCheck)) {
		return true;
	} else {
		return false;
	}
}

export default createReducer (INITIAL_STATE,  {
	[ADD_WISHLIST_ITEM.ADD_WISHLIST_ITEM_FAILURE]: (state, error) => updateState(state, {
		isWishlistItemAdded: false,
		isAddingWishlistItem: false,
		error: error
	}),

	[ADD_WISHLIST_ITEM.ADD_WISHLIST_ITEM_SUCCESS]: state => updateState(state, {
		isWishlistItemAdded: true,
		isAddingWishlistItem: false,
		name: '',
		url: '',
		cost: '',
		priority: false,
		error:''
	}),

	[ADD_WISHLIST_ITEM.ADDING_WISHLIST_ITEM]: state => updateState(state, {
		isAddingWishlistItem: true,
		isWishlistItemAdded: false,
		error:''
	}),

	[ADD_WISHLIST_ITEM.CHANGE_NAME]: (state, name) => updateState(state, {
		name: name,
		isWishlistItemAdded: false,
		error:''
	}),

	[ADD_WISHLIST_ITEM.CHANGE_COST]: (state, cost) => updateState(state, {
		cost: cost,
		isValidCost: checkValidCost(cost),
		isWishlistItemAdded: false,
		error:''
	}),

	[ADD_WISHLIST_ITEM.CHANGE_URL]: (state, url) => updateState(state, {
		url: url,
		isValidUrl: checkValidUrl(url),
		isWishlistItemAdded: false,
		error:''
	}),

	[ADD_WISHLIST_ITEM.CHANGE_PRIORITY]: (state, priority) => updateState(state, {
		priority: priority,
		error:''
	})
});
