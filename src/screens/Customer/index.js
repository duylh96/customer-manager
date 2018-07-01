import React, { Component } from "react";
import CustomerHomeScreen from "./CustomerHomeScreen.js";
import CustomerAddScreen from "./CustomerAddScreen.js";
import { StackNavigator } from "react-navigation";
export default (CustomerNav = StackNavigator({
	CustomerHome: { screen: CustomerHomeScreen },
	CustomerAdd: { screen: CustomerAddScreen }
}));
