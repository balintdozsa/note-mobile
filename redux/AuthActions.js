export const setHost = host => (
	{
		type: 'SET_HOST',
		payload: host,
	}
);

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

export const setPushToken = pushToken => (
	{
		type: 'SET_PUSH_TOKEN',
		payload: pushToken,
	}
);