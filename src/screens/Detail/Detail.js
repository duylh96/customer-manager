/**
 * This class display customer details
 */

import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Button,
  Text,
  Icon,
  Title,
  List,
  ListItem
} from "native-base";
import { styles } from "../../styles/Styles.js";

export default class Detail extends Component {
  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("val", null);
    return (
      <Header style={styles.appHeader}>
        <Left>
          <Button transparent onPress={() => navigation.navigate("Customer")}>
            <Icon name="ios-arrow-back" style={styles.appHeaderIcon} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.appHeaderFont}>{data.name}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
