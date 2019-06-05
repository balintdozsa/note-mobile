import React from 'react';
import { Text, TouchableHighlight } from 'react-native';

import Colors from '../constants/Colors';

export default class SettingsButton extends React.Component {
	render() {
		return (
			<TouchableHighlight style={{
				height: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: Colors.buttonBg,
				borderColor: Colors.buttonBorder,
				borderTopWidth: 1,
				borderBottomWidth: 1,
				marginBottom: 6,
			}} underlayColor={Colors.buttonBorder} onPress={this.props.onPress /*() => { this.props.navigation.navigate('Login') }*/}>
				<Text style={{
					width: '100%',
					color: '#fff',
					fontWeight: 'bold',
					fontSize: 18,
					textAlign: 'left',
					paddingLeft: 25,
				}}>{this.props.title}</Text>
			</TouchableHighlight>
		);
	}
}