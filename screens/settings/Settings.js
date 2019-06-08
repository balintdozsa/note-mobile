import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';

import Colors from '../../constants/Colors';
import SettingsButton from '../../components/SettingsButton';

import { authStore } from '../../redux/AuthStore';
import { logOut } from '../../redux/AuthActions';

export default class Settings extends React.Component {
	state = {
		'isLoggedIn': false,
		'token': '',
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (<View />),
			headerRight: (<View />),
			headerTitleStyle: {
				marginRight: 'auto',
				marginLeft: 'auto'
			},
			headerTitle: '',
			headerTintColor: Colors.navHeadColor,
			headerStyle: {
				backgroundColor: Colors.navHeadBg,
				borderBottomWidth: 0,
				shadowColor: 'transparent',
				elevation: 0,
			},
		};
	}

	componentWillMount = () => {
		authStore.subscribe(() => {
			this.setState({ isLoggedIn: authStore.getState().auth.isLoggedIn > 0, token: authStore.getState().auth.token });
		});
	}

	render() {
		authText = (
			<SettingsButton title="Log in" onPress={() => { this.props.navigation.navigate('Login') }} />
		);

		if (authStore.getState().auth.isLoggedIn) {
			authText = (
				<View>
					<Text style={{ padding: 20, fontSize: 18, fontWeight: 'bold', color: '#000' }}>{'User: ' + authStore.getState().auth.userName}</Text>
					<SettingsButton title="Log Out" onPress={() => { authStore.dispatch(logOut()); }} />
				</View>
			);
		}

		return (
			<View style={{ paddingTop: 0, backgroundColor: Colors.bg, flex: 1 }}>
				<View style={{ paddingLeft: 15 }}><Text style={{ color: Colors.navBigHeadColor, fontSize: 34, fontWeight: 'bold', marginBottom: 10 }} >Settings</Text></View>
				<ScrollView style={{ paddingTop: 0, backgroundColor: Colors.bg }}>
					{authText}
					<SettingsButton title="Token" onPress={() => { alert(authStore.getState().auth.token.substr(authStore.getState().auth.token.length - 16, 16)) }} />
				</ScrollView>
			</View>
		);
	}
}
