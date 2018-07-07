import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import CustomerScreen from "../Customer/index.js";
import Sidebar from "../Sidebar/Sidebar.js";
import { DrawerNavigator } from "react-navigation";
import { scale, moderateScale, verticalScale } from "../../utils/scale.js";

const HomeScreenRouter = DrawerNavigator(
	{
		Home: { screen: HomeScreen },
		Customer: { screen: CustomerScreen }
	},
	{
		contentComponent: props => <Sidebar {...props} />,
		drawerWidth: scale(270)
	}
);

export default HomeScreenRouter;
