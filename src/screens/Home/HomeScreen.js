/**
 * This is Home Screen class
 * @author : Hoang Duy
 */
import React, { Component } from "react";
import { RefreshControl, AsyncStorage, View, Alert } from "react-native";
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
  Accordion,
  CheckBox,
  List,
  ListItem
} from "native-base";
import { styles } from "../../styles/Styles.js";
import firebase from "react-native-firebase";
import { listScheduleKey, listCustomerKey } from "../../utils/global.js";
import { parseDate } from "../../api/API.js";
import { m3 } from "../../utils/message.js";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      listAllCustomer: [],
      listAllScheduleDisplay: []
    };
    this.storeData = this.storeData.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.renderHeaderItem = this.renderHeaderItem.bind(this);
    this.retrieveAllCustomerData = this.retrieveAllCustomerData.bind(this);
  }

  componentDidMount() {
    // use cached list if possible
    this.retrieveData();
    this.retrieveAllCustomerData();
  }

  async storeData() {
    try {
      await AsyncStorage.setItem(
        listScheduleKey,
        JSON.stringify(this.state.listAllScheduleDisplay)
      );
    } catch (error) {
      alert(error);
    }
  }

  async retrieveAllCustomerData() {
    try {
      const value = await AsyncStorage.getItem(listCustomerKey);
      if (value !== null && value !== "[]") {
        this.setState({ listAllCustomer: JSON.parse(value) });
      }
    } catch (error) {
      alert(error);
    }
  }

  async retrieveData() {
    try {
      const value = await AsyncStorage.getItem(listScheduleKey);
      if (value !== null && value !== "[]") {
        this.setState({ listAllScheduleDisplay: JSON.parse(value) });
      } else {
        this.fetchData();
      }
    } catch (error) {
      alert(error);
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
  };

  refreshData(data) {
    this.fetchData();
  }

  fetchData = () => {
    let ref = firebase.database().ref("schedule");
    ref.once("value").then(
      function(snapshot) {
        let data = snapshot.val();

        let keys = this.getAllKeys(Object.values(data));
        let displayList = this.generateDisplayList(keys, data);

        this.setState({ listAllScheduleDisplay: displayList });
        this.setState({ refreshing: false });

        //update the cache list for later use
        this.storeData(displayList.slice(0));
      }.bind(this)
    );
  };

  getAllKeys(list) {
    let result = [];
    for (let i = 0; i < list.length; i++) {
      let exist = false;

      for (let j = 0; j < result.length; j++) {
        if (result[j] === list[i].date) {
          exist = true;
          break;
        }
      }

      if (!exist) {
        result.push(list[i].date);
      }
    }

    return result.sort();
  }

  generateDisplayList(keys, data) {
    let result = [];

    for (var i in keys) {
      let obj = {};
      obj.title = keys[i];
      obj.content = [];
      for (var j in data) {
        if (j.substring(0, 8) === obj.title) {
          let id = j.substring(8, j.length);
          obj.content.push({ name: data[j].name, id: id, date: keys[i] });
        }
      }

      result.push(obj);
    }

    return result;
  }

  getItemIndexByName(value) {
    let result = this.state.listAllScheduleDisplay.map((e, index) => {
      if (e.title === value) {
        return index;
      }
    });

    return result;
  }

  renderHeaderItem(title, expanded) {
    let displayColor = { color: "blue" };
    let i = this.getItemIndexByName(title);
    if (i[0] === 0) {
      displayColor.color = "red";
    }
    if (i[1] === 1) {
      displayColor.color = "orange";
    }

    return (
      <View style={styles.itemTitle}>
        <Title style={(styles.itemTitleFont, displayColor)}>
          {parseDate(title)}
        </Title>
        {expanded ? (
          <Icon type="FontAwesome" name="caret-up" />
        ) : (
          <Icon type="FontAwesome" name="caret-down" />
        )}
      </View>
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
          onPress: () => this.deleteData(item)
        }
      ],
      { cancelable: c }
    );
  }

  deleteData(item) {
    /**
     * delete schedule
     */
    //ref to schedule table
    let ref = firebase.database().ref("schedule");
    let sKey = item.date + item.id;
    ref.child(sKey).remove();

    //refresh data
    this.setState({ listAllScheduleDisplay: [] });
    this.onRefresh();
    alert("Xoá thành công!");
  }

  goToDetail(item) {
    let data = this.state.listAllCustomer.find(
      x => (x.key === undefined ? x.name === item.id : x.key === item.id)
    );
    if (data.key !== null) {
      this.props.navigation.navigate("Detail", {
        hasKey: true,
        val: data
      });
    }
    this.props.navigation.navigate("Detail", {
      hasKey: false,
      val: data
    });
  }

  render() {
    return (
      <Container>
        <Header style={styles.appHeader}>
          <Left />
          <Body>
            <Title style={styles.appHeaderFont}>Lịch hẹn</Title>
          </Body>
          <Right />
        </Header>
        <Content
          padder
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <Accordion
            dataArray={this.state.listAllScheduleDisplay}
            renderHeader={this.renderHeaderItem}
            expanded={0}
            renderContent={content => (
              <List
                dataArray={content}
                renderRow={item => (
                  <ListItem button onPress={() => this.goToDetail(item)}>
                    <Body>
                      <Text style={styles.itemContentFont}>{item.name}</Text>
                    </Body>
                    <Button
                      danger
                      transparent
                      onPress={() => this.showDialog("", m3, true, item)}
                    >
                      <Icon
                        type="MaterialCommunityIcons"
                        name="calendar-remove"
                      />
                    </Button>
                  </ListItem>
                )}
              />
            )}
          />
        </Content>
      </Container>
    );
  }
}
