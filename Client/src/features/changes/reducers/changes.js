import {createReducer, updateState} from '../../../common/utils';
import GET_CHANGES from '../constants/changes';

const INITIAL_STATE = {
	isGettingChanges: false,
	changes: [],
	displayList: [],
	error: ''
}

var _displayList = (changes) => {
	return changes;
}

export default createReducer (INITIAL_STATE,  {
	[GET_CHANGES.GET_CHANGES_FAILURE]: (state, error) => updateState(state, {
		isGettingChanges: false,	
		error: error
	}),

	[GET_CHANGES.GET_CHANGES_SUCCESS]: (state, changes) => updateState(state, {
		changes: changes,
		displayList: _displayList(changes),
		isGettingChanges: false,
		error:''
	}),

	[GET_CHANGES.GETTING_CHANGES]: state => updateState(state, {
		isGettingChanges: true,
		changes: [],
		displayList: [],
		error:''
	})
});
