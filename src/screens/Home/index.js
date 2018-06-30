import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import CustomerScreen from "../Customer/index.js";
import Sidebar from "../Sidebar/Sidebar.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
	{
		Home: { screen: HomeScreen },
		Customer: { screen: CustomerScreen }
	},
	{
		contentComponent: props => <Sidebar {...props} />
	}
);
export default HomeScreenRouter;
