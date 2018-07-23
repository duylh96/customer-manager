/**
 * This is Home Screen class
 * @author : Hoang Duy
 */
import React, { Component } from "react";
import { RefreshControl, AsyncStorage, View } from "react-native";
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
import { listScheduleKey } from "../../utils/global.js";
import { parseDate } from "../../api/API.js";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      listAllScheduleDisplay: []
    };
    this.storeData = this.storeData.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.renderHeaderItem = this.renderHeaderItem.bind(this);
  }

  componentDidMount() {
    // use cached list if possible
    this.retrieveData();
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

        let keys = this.getAllKeys(data);
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
    for (var k in list) {
      let exist = false;

      for (var i in result) {
        if (result[i] === k.substring(0, 8)) {
          exist = true;
          break;
        }
      }

      if (!exist) {
        result.push(k.substring(0, 8));
      }
    }

    return result;
  }

  generateDisplayList(keys, data) {
    let result = [];

    for (var i in keys) {
      let obj = {};
      obj.title = keys[i];
      obj.content = [];
      for (var j in data) {
        if (j.substring(0, 8) === obj.title) {
          obj.content.push(data[j].name);
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
                  <ListItem>
                    <Body>
                      <Text style={styles.itemContentFont}>{item}</Text>
                    </Body>
                    <Button danger transparent>
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
