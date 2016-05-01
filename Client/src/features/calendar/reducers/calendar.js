import {createReducer, updateState} from '../../../common/utils';
import CALENDAR from '../constants/calendar';
import moment from 'moment';
import {normaliseEvents} from '../utils/calendar';

const INITIAL_STATE = {
	isEventAdded: false,
	isAddingEvent: false,
	isValidEvent: false,
	isGettingEvents: false,
	isDeletingEvent: false,
	events: [],
	name: '',
	eventId: '',
	startDate: {},
	endDate: {},
	description: '',
	error: ''
}

var _convertToValidDate = (date) => {
	return {displayDate: moment(date).format('ddd DD/MM/YY HH:mm'), date: moment(date).format('YYYY-MM-DD HH:mm:SS')};
}

export default createReducer (INITIAL_STATE,  {
	[CALENDAR.ADD_EVENT_FAILURE]: (state, error) => updateState(state, {
		isEventAdded: false,
		isAddingEvent: false,
		error: error
	}),

	[CALENDAR.ADD_EVENT_SUCCESS]: state => updateState(state, {
		isEventAdded: true,
		isAddingEvent: false,
		name: '',
		startDate: '',
		endDate: '',
		description: '',
		error:''
	}),

	[CALENDAR.ADDING_EVENT]: state => updateState(state, {
		isAddingEvent: true,
		isEventAdded: false,
		error:''
	}),

	[CALENDAR.GETTING_EVENTS]: state => updateState(state, {
		isGettingEvents: true,
		error:''
	}),

	[CALENDAR.GET_EVENTS_SUCCESS]: (state, events) => updateState(state, {
		isGettingEvents: false,
		events: normaliseEvents(events),
		error: ''
	}),

	[CALENDAR.GET_EVENTS_FAILURE]: (state, error) => updateState(state, {
		isGettingEvents: false,
		error: error
	}),

	[CALENDAR.DELETING_EVENT]: state => updateState(state, {
		isDeletingEvent: true,
		error:''
	}),

	[CALENDAR.DELETE_EVENT_SUCCESS]: state => updateState(state, {
		isDeletingEvent: false,
		error: ''
	}),

	[CALENDAR.DELETE_EVENT_FAILURE]: (state, error) => updateState(state, {
		isDeletingEvent: false,
		error: error
	}),

	[CALENDAR.CHANGE_EVENT_NAME]: (state, name) => updateState(state, {
		name: name,
		isEventAdded: false,
		error:''
	}),

	[CALENDAR.CHANGE_EVENT_DATE]: (state, dates) => updateState(state, {
		startDate: _convertToValidDate(dates.start),
		endDate: _convertToValidDate(dates.end),
		isEventAdded: false,
		error:''
	}),

	[CALENDAR.CHANGE_EVENT_DESCRIPTION]: (state, desc) => updateState(state, {
		description: desc,
		isEventAdded: false,
		error:''
	}),

	[CALENDAR.SET_EVENT]: (state, event) => updateState(state, {
		name: event.title,
		description: event.description,
		startDate: _convertToValidDate(event.start),
		endDate: _convertToValidDate(event.end),
		eventId: event.id,
		error:''
	}),

	[CALENDAR.CLEAR_MODAL_STATE]: (state) => updateState(state, {
		name: '',
		description: '',
		startDate: {},
		endDate: {},
		error:''
	})
});
