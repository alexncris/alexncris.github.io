import {checkStatus, toJson, constructRequest, POST, parseBody} from '../../utils/fetchUtils';
import {valueFromEvent} from '../../utils'
import fetch from 'isomorphic-fetch';
import ERRORS from '../../constants/errors';
import AUTH from '../constants/auth';

function _changePassword(e) {
	return {
		type: AUTH.CHANGE_PASSWORD,
		payload: valueFromEvent(e)
	};
}

function _selectUser(name) {
	return {
		type: AUTH.SELECT_USER,
		payload: name
	};
}

function _loggingIn() {
	return {
		type: AUTH.LOGGING_IN,
		payload: name
	};
}

function _loginSuccess(sessionKey, user) {
	return {
		type: AUTH.LOGIN_SUCCESS,
		payload: {sessionKey: sessionKey, user: user}
	};
}

function _loginFailure(error) {
	return {
		type: AUTH.LOGIN_FAILURE,
		payload: error
	};
}

function _login() {
	return (dispatch, getState) => {
		var state = getState();
		var authState = state.auth;
		
		var req = new Request('http://localhost:3000/login', {
				method: 'POST',
				body: JSON.stringify({
					 username: authState.user,
					 password: authState.password
				}),
				headers: {'Content-Type': 'application/json',
						  'accept': 'application/json'}
			}
		);

		dispatch(_loggingIn())

        var success = false;

	    fetch(req)
	   	   .then(checkStatus)
	   	   .then(parseBody)
	       .then((body) => {
	       	  localStorage.sessionkey = body.sessionkey;
	       	  localStorage.user = body.user;
	      	  success = true;
	      	  dispatch(_loginSuccess(body.sessionkey, body.user));
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 401 ? ERRORS.BAD_CREDENTIALS : 
	      		 	error.response.status === 400 ?  error.response.text(): error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_loginFailure(text)));

	};
}

export default {
  login: _login,
  selectUser: _selectUser,
  changePassword: _changePassword 
};