/**
 * This class define Customer Home Screen
 * @author Hoang Duy
 */
import React, { Component } from "react";
import { StatusBar, Button } from "react-native";
import {
	Container,
	Header,
	Left,
	Right,
	Body,
	//Button,
	Text,
	Icon,
	Title
} from "native-base";
import { SafeAreaView } from "react-navigation";
import { styles } from "../../styles/Styles.js";

export default class CustomerHomeScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: (
			<Header>
				<Left />
				<Body>
					<Title>List Customer</Title>
				</Body>
				<Right />
			</Header>
		)
	});
	render() {
		return (
			<SafeAreaView style={[styles.container, { backgroundColor: "#ecf0f1" }]}>
				<StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
				<Text style={styles.paragraph}>Dark Screen</Text>
				<Button
					title="Next screen"
					onPress={() => this.props.navigation.navigate("Home")}
				/>
			</SafeAreaView>
		);
	}
}
