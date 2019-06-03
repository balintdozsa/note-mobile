//import PushNotification from 'react-native-push-notification';
//import { PushNotificationIOS } from 'react-native';
//import { authStore } from '../reducers/AuthStore';

import { Constants, Notifications, Permissions } from 'expo';

async function configure() {
	const { status } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);

	if (status !== 'granted') {
		await Permissions.askAsync(Permissions.NOTIFICATIONS);
	}
};

async function test() {
	var now = new Date();
	var nowCh = new Date(now.getTime() + (60 * 1000 * 1));

	const localNotification = {
		title: 'Example Title',
		body: 'This is the body text of the local notification',
		android: {
			sound: true,
		},
		ios: {
			sound: true,
		},
	};

	const schedulingOptions = { time: nowCh };

	let notificationId = await Notifications.scheduleLocalNotificationAsync(
		localNotification,
		schedulingOptions
	);
}

async function test2() {
	var now = new Date();
	var nowCh = new Date(now.getTime() + (60 * 1000 * 1));

	const localNotification = {
		title: 'Example Title 2',
		body: 'This is the body text of the local notification',
		android: {
			sound: true,
		},
		ios: {
			sound: true,
		},
	};

	const schedulingOptions = { time: nowCh };

	let notificationId = await Notifications.scheduleLocalNotificationAsync(
		localNotification,
		schedulingOptions
	);
}

export {
	configure,

	test,
	test2,
};