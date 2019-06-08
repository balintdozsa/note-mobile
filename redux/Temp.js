import { combineReducers } from 'redux';

const INITIAL_STATE = {
	note: null,
};

const temp = (state = INITIAL_STATE, action) => {
	ret = state;

	let {
		note,
	} = state;

	switch (action.type) {
		case 'EDIT_NOTE':
			note = action.payload;
			break;
		default:
			return ret;
	}

	const newState = {
		note,
	};

	return newState;
};

export default combineReducers({
	temp: temp,
});