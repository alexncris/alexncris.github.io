import {checkCreated, constructRequest, POST} from '../../../common/utils/fetchUtils';
import fetch from 'isomorphic-fetch';
import ERRORS from '../../../common/constants/errors';
import CALENDAR from '../constants/calendar';
import {valueFromEvent} from '../../../common/utils';

function _changeEventName(e) {
	return {
		type: CALENDAR.CHANGE_EVENT_NAME,
		payload: valueFromEvent(e)
	};
}

function _changeEventDate(dates) {
	return {
		type: CALENDAR.CHANGE_EVENT_DATE,
		payload: dates
	};
}

function _changeEventDescription(e) {
	return {
		type: CALENDAR.CHANGE_EVENT_DESCRIPTION,
		payload: valueFromEvent(e)
	};
}

function _addingCalendarEvent() {
	return {
		type: CALENDAR.ADDING_EVENT
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

function _clearModalState() {
	return {
		type: CALENDAR.CLEAR_MODAL_STATE
	}
}

function _addCalendarEvent() {
	return (dispatch, getState) => {
		var state = getState();
		var calendarState = state.calendar;

		if (!calendarState.name || !calendarState.startDate || !calendarState.endDate) {
			return dispatch(_addCalendarEventFailure(ERRORS.NO_EMPTY_FIELDS));
		}
		var obj = {
			name: calendarState.name,
			startDate: calendarState.startDate.date,
			endDate: calendarState.endDate.date,
			description: calendarState.description
		};

		var req = constructRequest(state, 'calendar', POST, obj);

		dispatch(_addingCalendarEvent())

        var success = false;

	    fetch(req)
	   	   .then(checkCreated)
	       .then(() => {
	      	  success = true;
	      	  dispatch(_addCalendarEventSuccess());
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
  changeEventDescription: _changeEventDescription,
  clearModalState: _clearModalState
};