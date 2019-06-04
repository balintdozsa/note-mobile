import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import TabBarIcon from '../components/TabBarIcon';
import HomeMain from '../screens/home/HomeMain';
import HomeSub from '../screens/home/HomeSub'
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const SubStack = createStackNavigator({
	HomeMain: {
		screen: HomeMain,
	},
	HomeSub: HomeSub,
	/*NewActivity: {
		screen: NewActivityScreen,
	},
	NewActivityWithSub: NewActivityWithSubScreen,
	OtherActivity: OtherActivityScreen,
	OtherActivityWithSub: OtherActivityWithSubScreen,*/
	//FavActivity: FavActivityScreen,
}, {

	});

const HomeStack = createStackNavigator({
	Sub: SubStack,
}, {
		defaultNavigationOptions: {
			header: null,
			headerMode: 'none',
		},
	});

HomeStack.navigationOptions = {
	tabBarLabel: 'notes',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={
				Platform.OS === 'ios'
					? `ios-paper-plane${focused ? '' : '-outline'}`
					: 'md-paper-plane'
			}
		/>
	),
	tabBarOptions: {
		inactiveTintColor: Colors.tabIconDefault,
		activeTintColor: Colors.tabIconSelected,
		style: {
			backgroundColor: Colors.tabBg,
			borderTopWidth: 1,
			borderTopColor: Colors.tabBorderColor,
		}
		//showLabel: false,
	},
};

const LinksStack = createStackNavigator({
	Links: LinksScreen,
}, {
		defaultNavigationOptions: {
			headerTintColor: Colors.navHeadColor,
			headerStyle: {
				backgroundColor: Colors.navHeadBg,
				//borderBottomWidth: 0,
				//shadowColor: 'transparent',
				//elevation: 0,
			},
			//headerTitle: 'Home',
			headerTitleStyle: {
				marginRight: 'auto',
				marginLeft: 'auto'
			},
		},
	});

LinksStack.navigationOptions = {
	tabBarLabel: 'Links',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
		/>
	),
	tabBarOptions: {
		inactiveTintColor: Colors.tabIconDefault,
		activeTintColor: Colors.tabIconSelected,
		style: {
			backgroundColor: Colors.tabBg,
			borderTopWidth: 1,
			borderTopColor: Colors.tabBorderColor,
		}
		//showLabel: false,
	},
};

const SettingsStack = createStackNavigator({
	Settings: SettingsScreen,
}, {
		defaultNavigationOptions: {
			headerTintColor: Colors.navHeadColor,
			headerStyle: {
				backgroundColor: Colors.navHeadBg,
				//borderBottomWidth: 0,
				//shadowColor: 'transparent',
				//elevation: 0,
			},
			//headerTitle: 'Home',
			headerTitleStyle: {
				marginRight: 'auto',
				marginLeft: 'auto'
			},
		},
	});

SettingsStack.navigationOptions = {
	tabBarLabel: 'settings',
	tabBarIcon: ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
		/>
	),
	tabBarOptions: {
		inactiveTintColor: Colors.tabIconDefault,
		activeTintColor: Colors.tabIconSelected,
		style: {
			backgroundColor: Colors.tabBg,
			borderTopWidth: 1,
			borderTopColor: Colors.tabBorderColor,
		}
		//showLabel: false,
	},
};

export default createBottomTabNavigator({
	HomeStack,
	//LinksStack,
	SettingsStack,
});
