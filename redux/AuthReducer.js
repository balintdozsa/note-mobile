import { combineReducers } from 'redux';

const INITIAL_STATE = {
	isLoggedIn: 0,
	userName: '',
	token: '',
};

const authReducer = (state = INITIAL_STATE, action) => {
	ret = state;

	let {
		isLoggedIn,
		userName,
		token,
	} = state;

	switch (action.type) {
		case 'LOG_IN':
			isLoggedIn = 1;
			break;
		case 'LOG_OUT':
			isLoggedIn = 0;
			token = '';
			break;
		case 'SET_USER_NAME':
			userName = action.payload;
			break;
		case 'SET_TOKEN':
			token = action.payload;
			break;
		default:
			return ret;
	}

	const newState = {
		isLoggedIn,
		userName,
		token,
	};

	return newState;
};

export default combineReducers({
	auth: authReducer,
});