import {createReducer, updateState} from '../../../common/utils';
import CALENDAR from '../constants/calendar';
import moment from 'moment';

const INITIAL_STATE = {
	isEventAdded: false,
	isAddingEvent: false,
	isValidEvent: false,
	name: '',
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

	[CALENDAR.CLEAR_MODAL_STATE]: (state) => updateState(state, {
		name: '',
		description: '',
		startDate: {},
		endDate: {},
		error:''
	})
});
