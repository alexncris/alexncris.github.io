import {createReducer, updateState} from '../../utils';
import AUTH from '../constants/auth';

var sessionKey = localStorage.sessionkey;
var user = localStorage.user;

const INITIAL_STATE = {
	password: '',
	user: user ? user : '',
	sessionKey: sessionKey,
	isLoggingIn: false,
	isLoggedIn: sessionKey && user ? true : false,
	error: ''
}

export default createReducer (INITIAL_STATE,  {
	[AUTH.CHANGE_PASSWORD]: (state, password) => updateState(state, {
		password: password,
		error:''
	}),

	[AUTH.SELECT_USER]: (state, name) => updateState(state, {
		user: name,
		error:''
	}),

	[AUTH.LOGIN_FAILURE]: (state, error) => updateState(state, {
		isLoggingIn: false,
		isLoggedIn: false,
		error: error
	}),

	[AUTH.LOGIN_SUCCESS]: (state, value) => updateState(state, {
		user: value.user,
		sessionKey: value.sessionKey,
		isLoggedIn: true,
		isLoggingIn: false,
		error:''
	}),

	[AUTH.LOGGING_IN]: state => updateState(state, {
		isLoggingIn: true,
		isLoggedIn: false,
		error:''
	})
});
