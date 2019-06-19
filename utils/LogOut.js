import { authStore } from '../redux/Stores';
import { logOut as _logOut } from '../redux/AuthActions';

export const logOut = () => {
	let token = authStore.getState().auth.token;
	let pushToken = authStore.getState().auth.pushToken;

	var url = authStore.getState().auth.host + '/' + 'api/user/revokeUserToken';

	fetch(url, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authStore.getState().auth.token,
		},
	}).then((response) => response.json()).then((response) => {

	}).then(() => {

	}).catch((err) => {

	})
		.done();

	var url = authStore.getState().auth.host + '/' + 'api/user/unsetPushToken';
	var formBody = new FormData();
	formBody.append('push_token', pushToken);

	fetch(url, {
		method: "POST",
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: formBody
	}).then((response) => response.json()).then((response) => {
		if (response.status === "ok") {
			authStore.dispatch(_logOut());
		}
	}).then(() => {

	}).catch((err) => {

	})
		.done();
}