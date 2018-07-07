/**
 * This class display customer details
 */

import React, { Component } from "react";
import {
  Container,
  View,
  Content,
  Header,
  Left,
  Right,
  Body,
  Fab,
  Card,
  CardItem,
  Button,
  Text,
  Icon,
  Title,
  List,
  ListItem
} from "native-base";
import { styles } from "../../styles/Styles.js";
import firebase from "react-native-firebase";
import { AsyncStorage } from "react-native";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("val", "");
    const haskey = navigation.getParam("hasKey", false);
    return (
      <Container>
        <Header style={styles.appHeader}>
          <Left>
            <Button transparent onPress={() => navigation.goBack("")}>
              <Icon name="ios-arrow-back" style={styles.appHeaderIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.appHeaderFont}>{data.name}</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <Content padder maximumZoomScale={5} minimumZoomScale={1}>
            <Text style={styles.detailItemFont}>{data.description}</Text>
          </Content>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="share" />
            <Button style={{ backgroundColor: "#34A34F" }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: "#3B5998" }}>
              <Icon name="mail" />
            </Button>
            <Button
              style={{ backgroundColor: "#DD5144" }}
              onPress={() =>
                navigation.navigate("CustomerAdd", { val: data, mode: "edit" })
              }
            >
              <Icon name="hammer" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
