import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native';
import { Notifications } from 'expo';

import Colors from '../../constants/Colors';
import SettingsButton from '../../components/SettingsButton';

import { HeaderBackButton } from 'react-navigation';

import { authStore } from '../../redux/Stores';
import { logIn, setUserName, setToken } from '../../redux/AuthActions';

export default class Settings extends React.Component {
	defaultUsername = '';
	defaultPassword = '';

	state = {
		username: this.defaultUsername,
		password: this.defaultPassword,
		token: '',
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (
				<HeaderBackButton
					onPress={() => navigation.goBack()}
					//title="Vissza"
					tintColor={Colors.navHeadColor}
					backTitleVisible={true}
				/>
			),
			headerRight: (<View />),
			headerTitleStyle: {
				marginRight: 'auto',
				marginLeft: 'auto'
			},
			headerTitle: 'Log in',
			headerTintColor: Colors.navHeadColor,
			headerStyle: {
				backgroundColor: Colors.navHeadBg,
				borderBottomColor: Colors.navHeadBorder,
			},
		};
	}

	async afterLogIn(user_token) {
		var url = authStore.getState().auth.host + '/' + 'api/user/setPushToken';

		let push_token = await Notifications.getExpoPushTokenAsync();
		push_token = push_token.replace('ExponentPushToken', '').replace('[', '').replace(']', '');

		var formBody = new FormData();
		formBody.append('token', push_token);

		fetch(url, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + user_token,
			},
			body: formBody
		}).then((response) => {
			console.log(response);
		}).then(() => {

		}).catch((err) => {
			console.log(err);
		})
			.done();
	}

	logIn() {
		var url = authStore.getState().auth.host + '/' + 'api/login';

		var formBody = new FormData();
		formBody.append('email', this.state.username);
		formBody.append('password', this.state.password);

		fetch(url, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: formBody
		}).then((response) => response.json()).then((response) => {
			if (response.token) {
				this.setState({ token: response.token });

				this.afterLogIn(response.token);

				authStore.dispatch(setUserName(this.state.username));
				authStore.dispatch(setToken(response.token));
				authStore.dispatch(logIn());

				this.props.navigation.navigate('Settings');
			}
			console.log(response);
		}).then(() => {

		}).catch((err) => {
			console.log(err);
		})
			.done();
	}

	render() {
		return (
			<ScrollView style={{ paddingTop: 20, backgroundColor: Colors.bg }}>
				<TextInput
					ref="username"
					style={{
						padding: 9, color: '#222', fontSize: 18,
						backgroundColor: '#fff',
						marginLeft: 10, marginRight: 10,
						borderTopLeftRadius: 10, borderTopRightRadius: 10,
					}}
					placeholder='Username'
					defaultValue={this.defaultUsername}
					onChangeText={(text) => this.setState({ username: text })}
					autoCorrect={false}
				/>
				<TextInput
					ref="password"
					style={{
						marginBottom: 10, padding: 9, color: '#222', borderColor: '#ccc', fontSize: 18,
						backgroundColor: '#fff',
						marginLeft: 10, marginRight: 10,
						borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
					}}
					placeholder='Password'
					defaultValue={this.defaultPassword}
					onChangeText={(text) => this.setState({ password: text })}
					secureTextEntry={true}
				/>
				<SettingsButton title="Log in" onPress={() => this.logIn()} />
				<Text style={{ flex: 1, color: '#ff0000', fontSize: 18, padding: 10 }} >{this.state.token.substr(this.state.token.length - 16, 16)}</Text>
			</ScrollView>
		);
	}
}
