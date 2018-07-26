/*
 * This class display customer history
 */

import React, { Component } from "react";
import { FlatList, Alert } from "react-native";
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
import { m3 } from "../../utils/message.js";

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerInfo: {},
      data: [],
      id: ""
    };

    this.deleteData = this.deleteData.bind(this);
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

  showDialog(title, message, c, item) {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          style: "cancel",
          onPress: () => this.deleteData(this.state.id, item)
        }
      ],
      { cancelable: c }
    );
  }

  deleteData(key, item) {
    /**
     * delete schedule
     */
    //ref to schedule table
    let ref = firebase.database().ref("schedule");

    let sKey = item.date + key;
    ref.child(sKey).remove();

    /**
     * delete history
     */
    //ref to history table
    ref = firebase.database().ref("history");
    ref
      .child(key)
      .child(item.date)
      .remove();

    //refresh data
    this.setState({ data: [] });
    this.refreshData(key);
    alert("Xoá thành công!");
  }

  refreshData(key) {
    this.fetchData(key);
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
                  mode: "create",
                  refresh: this.refreshData.bind(this)
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
                          mode: "edit",
                          refresh: this.refreshData.bind(this)
                        })
                      }
                    >
                      <Icon active type="FontAwesome" name="edit" />
                    </Button>
                    <Button
                      full
                      bordered
                      rounded
                      danger
                      onPress={() => this.showDialog("", m3, true, item)}
                    >
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
