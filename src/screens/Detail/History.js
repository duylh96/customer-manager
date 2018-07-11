/*
 * This class display customer history
 */

import React, { Component } from "react";
import { FlatList } from "react-native";
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
  Card,
  CardItem,
  Title,
  List,
  ListItem
} from "native-base";
import { styles } from "../../styles/Styles.js";
import firebase from "react-native-firebase";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let { navigation } = this.props;
    let val = navigation.getParam("val", "");
    let key = val.key === undefined ? val.name : val.key;
    this.fetchData(key);
  }

  fetchData(key) {
    let ref = firebase.database().ref("history");
    ref
      .child(key)
      .once("value")
      .then(
        function(snapshot) {
          let list = Object.values(snapshot.val());
          this.setState({ data: list });
        }.bind(this)
      );
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header style={styles.appHeader}>
          <Left>
            <Button transparent onPress={() => navigation.goBack("")}>
              <Icon name="ios-arrow-back" style={styles.appHeaderIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.appHeaderFont}>Lịch sử đặt đồ</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Card>
                <CardItem header bordered>
                  <Text>{item.date}</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>{item.description}</Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                  <Left>
                    <Text>Tiền : 0 VNĐ</Text>
                  </Left>
                  <Body>
                    <Button transparent>
                      <Icon active type="FontAwesome" name="edit" />
                      <Text>Chỉnh sửa</Text>
                    </Button>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Icon
                        active
                        type="MaterialCommunityIcons"
                        name="delete-forever"
                      />
                      <Text>Xoá</Text>
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            )}
          />
        </Content>
      </Container>
    );
  }
}
