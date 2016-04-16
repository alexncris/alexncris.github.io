export function createReducer (initialState, reducerMap) {
	return (state = initialState, action) => {
		const reducer = reducerMap[action.type];

		return reducer ? reducer(state, action.payload) : state;
	};
}

export function updateState (state, changes) {
	return Object.assign({}, state, changes)
};

export function createConstants (...constants) {
	return constants.reduce((acc, constant) => {
		acc[constant] = constant;
		return acc;
	}, {});
}

export function getCookie(name){
	var cookiestring=RegExp(''+name+'[^;]+').exec(document.cookie);
	return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,'') : '');
}

export function noOp(){}

export function valueFromEvent(e){
	return e.target ? e.target.value : e;
}
