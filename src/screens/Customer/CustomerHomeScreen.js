/**
 * This class define Customer Home Screen
 * @author Hoang Duy
 */
import React, { Component } from "react";
import { RefreshControl, ListView, Alert } from "react-native";
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
import { scale, moderateScale, verticalScale } from "../../utils/scale.js";
import firebase from "react-native-firebase";
import { compareCustomerName } from "../../api/API.js";

export default class CustomerHomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header style={styles.appHeader}>
        <Left>
          <Button transparent onPress={() => navigation.openDrawer()}>
            <Icon name="ios-menu" style={styles.appHeaderIcon} />
          </Button>
        </Left>
        <Body>
          <Title style={styles.appHeaderFont}>Khách hàng</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => navigation.navigate("CustomerAdd")}
          >
            <Icon name="md-person-add" style={styles.appHeaderIcon} />
          </Button>
        </Right>
      </Header>
    )
  });

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      refreshing: false,
      listAllCustomer: []
    };
    this.fetchData();
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData();
  };

  goToDetail(data) {
    if (data.key !== null) {
      this.props.navigation.navigate("CustomerAdd", { id: data.key });
    }
    this.props.navigation.navigate("CustomerAdd", { id: data.name });
  }

  fetchData = () => {
    let ref = firebase.database().ref("customer");
    ref.once("value").then(
      function(snapshot) {
        let data = Object.values(snapshot.val());
        data.sort(compareCustomerName);
        this.setState({ listAllCustomer: data });
        this.setState({ refreshing: false });
      }.bind(this)
    );
  };

  deleteRow(data) {
    //simulate delete
    Alert.alert(data.name);
  }

  render() {
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          <List
            dataSource={this.ds.cloneWithRows(this.state.listAllCustomer)}
            renderRow={data => (
              <ListItem style={styles.customerItem}>
                <Left>
                  <Text style={styles.customerItemFont}> {data.name} </Text>
                </Left>
                <Right>
                  <Button transparent onPress={() => this.goToDetail(data)}>
                    <Icon
                      name="arrow-forward"
                      style={styles.customerItemFont}
                    />
                  </Button>
                </Right>
              </ListItem>
            )}
            renderLeftHiddenRow={data => (
              <Button full success onPress={() => alert("Gọi " + data.name)}>
                <Icon active name="ios-call" />
              </Button>
            )}
            renderRightHiddenRow={data => (
              <Button full danger onPress={() => this.deleteRow(data)}>
                <Icon active name="trash" />
              </Button>
            )}
            leftOpenValue={scale(80)}
            rightOpenValue={scale(-80)}
          />
        </Content>
      </Container>
    );
  }
}
