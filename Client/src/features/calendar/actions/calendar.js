import {checkCreated, constructRequest, POST} from '../../../common/utils/fetchUtils';
import fetch from 'isomorphic-fetch';
import ERRORS from '../../../common/constants/errors';
import CALENDAR from '../constants/calendar';
import {valueFromEvent} from '../../../common/utils';

function _changeEventName(name) {
	return {
		type: CALENDAR.CHANGE_NAME,
		payload: name
	};
}

function _changeEventDate(date) {
	return {
		type: CALENDAR.CHANGE_DATE,
		payload: date
	};
}

function _changeEventDescription(description) {
	return {
		type: CALENDAR.CHANGE_DESC,
		payload: description
	};
}

function _addingCalendarEvent() {
	return {
		type: CALENDAR.ADDING_CALENDAR_EVENT
	};
}

function _addCalendarEventFailure(error) {
	return {
		type: CALENDAR.ADD_EVENT_FAILURE,
		payload: error
	};
}

function _addCalendarEventSuccess() {
	return {
		type: CALENDAR.ADD_EVENT_SUCCESS
	};
}

function _addCalendarEvent() {
	return (dispatch, getState) => {
		var state = getState();
		var calendarState = state.calendarState;

		if (!calendarState.name || !calendarState.date || !calendarState.time || !calendarState.description) {
			return dispatch(_addCalendarEventFailure(ERRORS.NO_EMPTY_FIELDS));
		}

		var obj = {
			name: calendarState.name,
			date: calendarState.date,
			description: calendarState.desc
		};

		var req = constructRequest(state, 'calendar', POST, obj);

		dispatch(_addingCalendarEvent())

        var success = false;

	    fetch(req)
	   	   .then(checkCreated)
	       .then(() => {
	      	  success = true;
	      	  dispatch(_addCalendarEventSuccess());
	      	  dispatch(getWishlistActions.getWishlist());
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 400 ?  ERRORS.BAD_REQUEST : error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_addCalendarEventFailure(text)));

	};
}

export default {
  addCalendarEvent: _addCalendarEvent,
  changeEventName: _changeEventName,
  changeEventDate: _changeEventDate,
  changeEventDescription: _changeEventDescription
};