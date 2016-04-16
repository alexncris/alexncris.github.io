import {checkStatus, constructRequest, parseBody, DELETE} from '../../../common/utils/fetchUtils';
import fetch from 'isomorphic-fetch';
import ERRORS from '../../../common/constants/errors';
import GET_CHANGES from '../constants/changes';

function _gettingChanges() {
	return {
		type: GET_CHANGES.GETTING_CHANGES
	};
}

function _getChangesSuccess(wishlist) {
return {
		type: GET_CHANGES.GET_CHANGES_SUCCESS,
		payload: wishlist
	};
}

function _getChangesFailure(error) {
	return {
		type: GET_CHANGES.GET_CHANGES_FAILURE,
		payload: error
	};
}

function _getChanges() {
	return (dispatch, getState) => {
		var state = getState();		
		var req = constructRequest(state, 'changes');

		dispatch(_gettingChanges())

        var success = false;

	    fetch(req)
	   	   .then(checkStatus)
	   	   .then(parseBody)
	       .then((body) => {
	      	  success = true;
	      	  dispatch(_getChangesSuccess(body));
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 401 ? ERRORS.BAD_CREDENTIALS : 
	      		 	error.response.status === 400 ?  error.response.text(): error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_getChangesFailure(text)));

	};
}

export default {
  getChanges: _getChanges
};