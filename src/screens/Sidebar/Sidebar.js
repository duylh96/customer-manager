/**
 * This class define sidebar of App
 * @author : Hoang Duy
 */

import React, { Component } from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import { Container, Content, Text, Title, Button } from "native-base";

export default class Sidebar extends Component {
	render() {
		return (
			<Container>
				<Content>
					<Button onPress={() => this.props.navigation.navigate("Home")}>
						<Text>Trang chủ</Text>
					</Button>
					<Button onPress={() => this.props.navigation.navigate("Customer")}>
						<Text>Danh sách khách hàng</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}
