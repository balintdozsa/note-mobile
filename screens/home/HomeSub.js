import React from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Button,
} from 'react-native';
import { WebBrowser } from 'expo';

import { HeaderBackButton } from 'react-navigation';

import Colors from '../../constants/Colors';

export default class HomeSub extends React.Component {
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
			headerTitle: 'HomeSub',
			headerTintColor: Colors.navHeadColor,
			headerStyle: {
				backgroundColor: Colors.navHeadBg,
			},
		};
	}

	render() {
		return (
			<View>
			</View>
		);
	}
};