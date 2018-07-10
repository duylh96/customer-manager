import React, { Component } from "react";
import CustomerHomeScreen from "./CustomerHomeScreen.js";
import CustomerAddScreen from "./CustomerAddScreen.js";
import DetailNavigator from "../Detail/index.js";
import { StackNavigator } from "react-navigation";
export default (CustomerNav = StackNavigator({
	CustomerHome: {
		screen: CustomerHomeScreen,
		navigationOptions: {
			header: null
		}
	},
	CustomerAdd: {
		screen: CustomerAddScreen,
		navigationOptions: {
			header: null
		}
	},
	Detail: {
		screen: DetailNavigator,
		navigationOptions: {
			header: null
		}
	}
}));
