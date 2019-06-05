import React from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';

import Colors from '../../constants/Colors';

import { HeaderBackButton } from 'react-navigation';

export default class Settings extends React.Component {
	static navigationOptions = {
		title: 'settings',
	};

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

	render() {
		return (
			<ScrollView style={{ paddingTop: 0 }}>

			</ScrollView>
		);
	}
}
