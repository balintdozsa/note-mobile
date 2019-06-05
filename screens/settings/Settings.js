import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';

import Colors from '../../constants/Colors';
import SettingsButton from '../../components/SettingsButton';

export default class Settings extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (<View style={{ paddingLeft: 20 }}><Text style={{ color: Colors.tabIconSelected, fontSize: 34, fontWeight: 'bold' }} >Settings</Text></View>),
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

	render() {
		return (
			<ScrollView style={{ paddingTop: 20 }}>
				<SettingsButton title="Log in" onPress={() => { this.props.navigation.navigate('Login') }} />
				<SettingsButton title="Token" onPress={() => { }} />
			</ScrollView>
		);
	}
}
