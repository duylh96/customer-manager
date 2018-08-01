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
import call from "react-native-phone-call";
import DialogInput from "react-native-dialog-input";
import SendSMS from "react-native-sms";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      data: {},
      needRefresh: false,
      isDialogVisible: false
    };
  }

  componentDidMount() {
    let { navigation } = this.props;
    let val = navigation.getParam("val", "");
    this.setState({ data: val });
  }

  refreshData(newData) {
    this.setState({ data: newData, needRefresh: true });
  }

  call(data) {
    if (data.phone.length >= 10 && data.phone !== "0") {
      const args = {
        number: data.phone, // String value with the number to call
        prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
      };

      call(args).catch(console.error);
    }
  }

  sendInput(inputText) {
    SendSMS.send(
      {
        body: inputText,
        recipients: [this.state.data.phone],
        successTypes: ["sent", "queued"]
      },
      (completed, cancelled, error) => {
        console.log(
          "SMS Callback: completed: " +
            completed +
            " cancelled: " +
            cancelled +
            "error: " +
            error
        );
      }
    );
    this.showDialog(false);
  }

  showDialog(show) {
    if (show === true) {
      if (this.state.data.phone.length < 10 || this.state.data.phone === "0") {
        return false;
      }
    }
    this.setState({ isDialogVisible: show });
  }

  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <Header style={styles.appHeader}>
          <Left>
            <Button
              transparent
              onPress={() => {
                if (this.state.needRefresh) {
                  navigation.state.params.refresh();
                }
                navigation.goBack("");
              }}
            >
              <Icon name="ios-arrow-back" style={styles.appHeaderIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.appHeaderFont}>{this.state.data.name}</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <DialogInput
            isDialogVisible={this.state.isDialogVisible}
            title={"Tin nhắn nhanh"}
            hintInput={"..."}
            submitInput={inputText => {
              this.sendInput(inputText);
            }}
            closeDialog={() => {
              this.showDialog(false);
            }}
            cancelText={"Huỷ"}
            submitText={"Gửi"}
          />
          <Content padder maximumZoomScale={5} minimumZoomScale={1}>
            <Text style={styles.detailItemFont}>
              {this.state.data.description}
            </Text>
          </Content>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon
              type="MaterialCommunityIcons"
              name={
                this.state.active ? "chevron-double-down" : "chevron-double-up"
              }
            />
            <Button
              style={{ backgroundColor: "#34A34F" }}
              onPress={() => this.call(this.state.data)}
            >
              <Icon name="logo-whatsapp" />
            </Button>
            <Button
              style={{ backgroundColor: "#3B5998" }}
              onPress={() => this.showDialog(true)}
            >
              <Icon type="MaterialIcons" name="message" />
            </Button>
            <Button
              style={{ backgroundColor: "#DD5144" }}
              onPress={() =>
                navigation.navigate("CustomerAdd", {
                  val: this.state.data,
                  mode: "edit",
                  refresh: this.refreshData.bind(this)
                })
              }
            >
              <Icon type="FontAwesome" name="edit" />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
