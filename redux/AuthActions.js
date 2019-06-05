export const logIn = () => {
	return {
		type: 'LOG_IN',
	}
};

export const logOut = () => {
	return {
		type: 'LOG_OUT',
	}
};

export const setUserName = userName => (
	{
		type: 'SET_USER_NAME',
		payload: userName,
	}
);

export const setToken = token => (
	{
		type: 'SET_TOKEN',
		payload: token,
	}
);