import {checkCreated, checkOk, checkStatus, parseBody, constructRequest, POST, DELETE} from '../../../common/utils/fetchUtils';
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

function _setEvent(event) {
	return {
		type: CALENDAR.SET_EVENT,
		payload: event
	}
}

function _addingCalendarEvent() {
	return {
		type: CALENDAR.ADDING_EVENT
	};
}

function _gettingCalendarEvents() {
	return {
		type: CALENDAR.GETTING_EVENTS
	};
}

function _deletingEvent() {
	return {
		type: CALENDAR.DELETING_EVENT
	};
}

function _deleteEventSuccess() {
	return {
		type: CALENDAR.DELETE_EVENT_SUCCESS
	};
}

function _deleteEventFailure(error) {
	return {
		type: CALENDAR.DELETE_EVENT_FAILURE,
		payload: error
	};
}

function _getEventsSuccess(events) {
	return {
		type: CALENDAR.GET_EVENTS_SUCCESS,
		payload: events
	};
}

function _getEventsFailure(error) {
	return {
		type: CALENDAR.GET_EVENTS_FAILURE,
		payload: error
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

		dispatch(_addingCalendarEvent());

        var success = false;

	    fetch(req)
	   	   .then(checkCreated)
	       .then(() => {
	      	  success = true;
	      	  dispatch(_addCalendarEventSuccess());
  	      	  dispatch(_getCalendarEvents());
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 400 ?  ERRORS.BAD_REQUEST : error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_addCalendarEventFailure(text)));

	};
}

function _getCalendarEvents() {
	return (dispatch, getState) => {
		var state = getState();
		var req = constructRequest(state, 'calendar');

		dispatch(_gettingCalendarEvents());

        var success = false;

	    fetch(req)
	   	   .then(checkOk)
	   	   .then(parseBody)
	       .then((body) => {
	      	  success = true;
	      	  dispatch(_getEventsSuccess(body));
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 400 ?  ERRORS.BAD_REQUEST : error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_getEventsFailure(text)));
	}
}

function _deleteCalendarEvent() {
	return (dispatch, getState) => {
		var state = getState();
		var eventId = state.calendar.eventId;
		var req = constructRequest(state, `calendar/${eventId}`, DELETE);

		dispatch(_deletingEvent());

        var success = false;

	    fetch(req)
	   	   .then(checkStatus)
	       .then(() => {
	      	  success = true;
	      	  dispatch(_deleteEventSuccess());
	      	  dispatch(_getCalendarEvents());
	        })
	       .catch(error => error.response ?
	      		 (error.response.status === 400 ?  ERRORS.BAD_REQUEST : error.response.text()) 
	      		 :  ERRORS.SERVER_UNREACHABLE)
		  .then( text  => success ? success :dispatch(_deleteEventFailure(text)));
	}
}

export default {
  addCalendarEvent: _addCalendarEvent,
  changeEventName: _changeEventName,
  changeEventDate: _changeEventDate,
  changeEventDescription: _changeEventDescription,
  clearModalState: _clearModalState,
  getCalendarEvents: _getCalendarEvents,
  setEvent: _setEvent,
  deleteCalendarEvent: _deleteCalendarEvent
};