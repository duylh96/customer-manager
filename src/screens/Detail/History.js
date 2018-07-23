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
import { parseStringToDate, parseDate } from "../../api/API.js";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerInfo,
      data: [],
      id: ""
    };
  }

  componentDidMount() {
    let { navigation } = this.props;
    let val = navigation.getParam("val", "");
    let key = val.key === undefined ? val.name : val.key;
    this.setState({ id: key, customerInfo: val });
    this.fetchData(key);
  }

  fetchData(key) {
    let ref = firebase.database().ref("history");
    ref
      .child(key)
      .once("value")
      .then(
        function(snapshot) {
          if (snapshot.val() !== null) {
            let list = Object.values(snapshot.val());
            this.setState({ data: list });
          }
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
          <Right>
            <Button
              transparent
              onPress={() =>
                navigation.navigate("HistoryAdd", {
                  ci: this.state.customerInfo,
                  mode: "create"
                })
              }
            >
              <Icon
                type="MaterialIcons"
                name="playlist-add"
                style={styles.appHeaderIcon}
              />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <Card>
                <CardItem header bordered>
                  <Text style={styles.dateItemFont}>
                    {parseDate(item.date)}
                  </Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text style={styles.descriptionItemFont}>
                      {item.description}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem footer bordered>
                  <Left>
                    <Text style={styles.moneyItemFont}>Tiền : 0,000 VNĐ</Text>
                  </Left>
                  <Right style={styles.buttonContainer}>
                    <Button
                      full
                      bordered
                      rounded
                      info
                      onPress={() =>
                        navigation.navigate("HistoryAdd", {
                          ci: this.state.customerInfo,
                          val: item,
                          mode: "edit"
                        })
                      }
                    >
                      <Icon active type="FontAwesome" name="edit" />
                    </Button>
                    <Button full bordered rounded danger>
                      <Icon
                        active
                        type="MaterialCommunityIcons"
                        name="delete-forever"
                      />
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
