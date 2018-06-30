/**
 * This is Home Screen class
 * @author : Hoang Duy
 */
import React, { Component } from "react";
import { Platform } from "react-native";
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
import { listAllCustomer, getAllCustomer } from "../../api/Api.js";

export default class HomeScreen extends Component {
  render() {
    getAllCustomer();
    var data = listAllCustomer;
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Trang chủ</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}
