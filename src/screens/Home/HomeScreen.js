/**
 * This is Home Screen class
 * @author : Hoang Duy
 */
import React, { Component } from "react";
import { StatusBar } from "react-native";
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

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Trang chu</Title>
          </Body>
          <Right />
        </Header>
        <Button onPress={() => this.props.navigation.navigate("Customer")}>
          <Text>Click me!</Text>
        </Button>
      </Container>
    );
  }
}
