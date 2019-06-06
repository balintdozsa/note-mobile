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
				borderWidth: 1,
				marginBottom: 6,
				marginLeft: 10,
				marginRight: 10,
				borderRadius: 10,
			}} underlayColor={Colors.buttonBorder} onPress={this.props.onPress /*() => { this.props.navigation.navigate('Login') }*/}>
				<Text style={{
					width: '100%',
					color: '#fff',
					fontWeight: 'bold',
					fontSize: 18,
					textAlign: 'left',
					paddingLeft: 10,
				}}>{this.props.title}</Text>
			</TouchableHighlight>
		);
	}
}