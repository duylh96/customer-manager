/**
 * This class define Customer Home Screen
 * @author Hoang Duy
 */
import React, { Component } from "react";
import {
	Container,
	Header,
	Left,
	Right,
	Body,
	Button,
	Text,
	Icon,
	Title
} from "native-base";
import { styles } from "../../styles/Styles.js";

export default class CustomerHomeScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		header: (
			<Header>
				<Left>
					<Button transparent onPress={() => navigation.goBack()}>
						<Icon name="arrow-back" />
					</Button>
				</Left>
				<Body>
					<Title>List Customer</Title>
				</Body>
				<Right />
			</Header>
		)
	});
	render() {
		return <Container />;
	}
}
