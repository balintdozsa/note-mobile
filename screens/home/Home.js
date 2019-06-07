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
	TouchableHighlight,
	RefreshControl,
	TextInput,
} from 'react-native';
import { WebBrowser } from 'expo';

import { HeaderBackButton } from 'react-navigation';

import Colors from '../../constants/Colors';
import SettingsButton from '../../components/SettingsButton';

import { pushNotifications } from '../../notifications';

import { authStore } from '../../redux/AuthStore';

export default class Home extends React.Component {
	state = {
		refreshing: false,
		items: [],
		editNote: '',
	}

	_values = {
		editNote: '',
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (<View style={{ paddingLeft: 15 }}><Text style={{ color: Colors.tabIconSelected, fontSize: 34, fontWeight: 'bold' }} >Notes</Text></View>),
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

	listNotes() {
		var url = 'https://altair-ocean.bdozsa.com' + '/' + 'api/notes';

		fetch(url, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authStore.getState().auth.token,
			},
			//body: formBody
		}).then((response) => response.json()).then((response) => {
			if (response.data) {
				this.setState({ items: response.data });
			} else {
				this.setState({ items: [] });
			}
		}).then(() => {

		}).catch((err) => {
			//this.setState({ items: [] });
			console.log(err);
		})
			.done();
	}

	saveNote() {
		var note = this._values.editNote;

		var url = 'https://altair-ocean.bdozsa.com' + '/' + 'api/notes/add';

		var formBody = [];
		formBody.push('note=' + encodeURIComponent(note));
		formBody = formBody.join("&");

		fetch(url + '?' + formBody, {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authStore.getState().auth.token,
			},
			body: formBody
		}).then((response) => response.json()).then((response) => {
			console.log(response);
			if (response.status === "ok") {
				this.listNotes();
				this.textInput.clear();
			}
		}).then(() => {

		}).catch((err) => {
			console.log(err);
		})
			.done();
	}

	componentWillMount = () => {
		this.listNotes();
	}

	_onRefresh = () => {
		this.listNotes();
	}

	/*
		<Button
			onPress={() => { pushNotifications.test() }}
			title="Notifi"
			color="#841584"
			accessibilityLabel=""
		/>
		onChangeText={(text) => this.setState({ editNote: text })}
	 */

	render() {
		let newNote = (
			<View style={{ flexDirection: 'row' }}>
				<TextInput
					ref="host"
					style={{
						marginBottom: 6, padding: 9, color: '#222', borderColor: '#f5f5f5', borderBottomWidth: 1, fontSize: 18,
						backgroundColor: '#fff',
						flex: 1
					}}
					placeholder='My note'
					defaultValue={this.defaultHost}
					onChangeText={(val) => this._values.editNote = val}
					autoCorrect={false}
					ref={input => { this.textInput = input }}
				/>
				<TouchableHighlight style={{
					height: 50, marginLeft: 0, marginRight: 0, marginBottom: 0, flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					marginBottom: 6,
					marginLeft: 10,
					marginRight: 10,
					borderRadius: 10,
					width: 55,
				}} underlayColor={Colors.buttonBorder} onPress={() => { this.saveNote() }}>
					<Text style={{
						width: '100%',
						color: '#555',
						fontWeight: 'bold',
						fontSize: 28,
						textAlign: 'center',
					}}>{'\u2713'}</Text>
				</TouchableHighlight>
			</View>
		);

		let i = 0;
		let notes = this.state.items.map((userData) => {
			console.log(userData);
			i++;
			return (
				<View style={{ marginBottom: 6, padding: 10, borderRadius: 5, backgroundColor: '#eee' }} key={i}>
					<Text style={{ fontSize: 14, color: '#999' }}>{userData.updated_at}</Text>
					<Text style={{ fontSize: 16 }}>{userData.note}</Text>
				</View>
			);
		});
		notes = (<View style={{ margin: 10, marginTop: 0 }}>{notes}</View>);

		return (
			<ScrollView style={{ paddingTop: 20 }}
				refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
					/>
				}>
				{newNote}
				{notes}
			</ScrollView>
		);

		return (
			<ScrollView style={{ paddingTop: 0 }}>
				<TouchableHighlight style={{
					height: 40, marginLeft: 20, marginRight: 20, marginBottom: 20, flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: Colors.tabIconSelected
				}} onPress={() => { this.props.navigation.navigate('HomeSub') }} underlayColor="white">
					<Text style={{
						color: '#fff',
						fontWeight: 'bold',
					}}>Go!</Text>
				</TouchableHighlight>
				<Text>
					2019-06-03 10:17
        		</Text>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: { height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 20,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
});
