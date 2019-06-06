import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableHighlight } from 'react-native';

import Colors from '../../constants/Colors';
import SettingsButton from '../../components/SettingsButton';

import { HeaderBackButton } from 'react-navigation';

import { authStore } from '../../redux/AuthStore';
import { logIn, setUserName, setToken } from '../../redux/AuthActions';

export default class Settings extends React.Component {
	defaultHost = 'http://172.16.0.139:8089';
	defaultUsername = 'admin@example.com';
	defaultPassword = 'password';

	state = {
		'host': this.defaultHost,
		'username': this.defaultUsername,
		'password': this.defaultPassword,
		'token': '',
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
			},
		};
	}

	logIn() {
		var url = this.state.host + '/' + 'api/login';

		var formBody = [];
		formBody.push('email=' + encodeURIComponent(this.state.username));
		formBody.push('password=' + encodeURIComponent(this.state.password));
		formBody = formBody.join("&");
		console.log(url, formBody);

		fetch(url + '?' + formBody, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			//body: formBody
		}).then((response) => response.json()).then((response) => {
			if (response.token) {
				this.setState({ 'token': response.token });

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
			<ScrollView style={{ paddingTop: 0 }}>
				<TextInput
					ref="host"
					style={{
						marginTop: 5, padding: 9, color: '#222', borderColor: '#fff', borderWidth: 0, fontSize: 18,
						backgroundColor: '#fff',
						borderTopLeftRadius: 7, borderTopRightRadius: 7,
						width: '100%',
					}}
					placeholder='Host'
					defaultValue={this.defaultHost}
					onChangeText={(text) => this.setState('host', text)}
					autoCorrect={false}
				/>
				<TextInput
					ref="username"
					style={{
						marginTop: 5, padding: 9, color: '#222', borderColor: '#fff', borderWidth: 0, fontSize: 18,
						backgroundColor: '#fff',
						borderTopLeftRadius: 7, borderTopRightRadius: 7,
						width: '100%',
					}}
					placeholder='Username'
					defaultValue={this.defaultUsername}
					onChangeText={(text) => this.setState('username', text)}
					autoCorrect={false}
				/>
				<TextInput
					ref="password"
					style={{
						marginBottom: 5, padding: 9, color: '#222', borderColor: '#f5f5f5', borderTopWidth: 1, fontSize: 18,
						backgroundColor: '#fff',
						borderBottomLeftRadius: 7, borderBottomRightRadius: 7,
						width: '100%',
					}}
					placeholder='Password'
					defaultValue={this.defaultPassword}
					onChangeText={(text) => this.setState('password', text)}
					secureTextEntry={true}
				/>
				<SettingsButton title="Log in" onPress={() => this.logIn()} />
				<Text style={{ flex: 1, color: '#ff0000', fontSize: 18, padding: 10 }} >{this.state.token.substr(this.state.token.length - 16, 16)}</Text>
			</ScrollView>
		);
	}
}
