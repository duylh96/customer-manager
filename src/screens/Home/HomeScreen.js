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
        <Header style={styles.appHeader}>
          <Left />
          <Body>
            <Title style={styles.appHeaderFont}>Trang chủ</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}
