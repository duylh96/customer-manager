/**
 * This class define history add/edit screen
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
  DatePicker,
  Text,
  Textarea,
  Icon,
  Card,
  CardItem,
  Title,
  Form,
  Item
} from "native-base";
import { styles } from "../../styles/Styles.js";
import firebase from "react-native-firebase";
import { m1, m2 } from "../../utils/message.js";
import {
  parseDateToString,
  compareDateWithNow,
  showError,
  prettifyStringDate
} from "../../api/API.js";

export default class HistoryAddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "",
      chosenDate: "",
      shortDescription: "",
      ci: "",
      needRefresh: false
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    if (this.state.mode !== "edit") {
      this.setState({ chosenDate: parseDateToString(newDate) });
    }
  }

  componentDidMount() {
    let { navigation } = this.props;

    let m = navigation.getParam("mode", "create");
    let customerInfo = navigation.getParam("ci", {});

    this.setState({ mode: m, ci: customerInfo });

    if (m === "edit") {
      let data = navigation.getParam("val", {});
      this.setState({
        chosenDate: data.date,
        shortDescription: data.description
      });
    }
  }

  createSchedule() {
    if (this.checkValid()) {
      //assign data to new object
      let schedule = new Object();

      schedule.name = this.state.ci.name;
      schedule.date = this.state.chosenDate;
      schedule.description = this.state.shortDescription;

      let key =
        this.state.ci.key === undefined
          ? this.state.ci.name
          : this.state.ci.key;

      /**
       * create schedule
       */
      //ref to schedule table
      let ref = firebase.database().ref("schedule");

      let sKey = schedule.date + key;
      ref.child(sKey).set(schedule);

      /**
       * create history
       */
      //ref to history table
      ref = firebase.database().ref("history");
      ref
        .child(key)
        .child(schedule.date)
        .set(schedule);

      this.setState({ needRefresh: true, shortDescription: "" });

      alert("Thêm thành công!");
    }
  }

  updateSchedule() {
    if (this.checkValid()) {
      //ref to schedule table
      let ref = firebase.database().ref("schedule");

      //update table
      let key =
        this.state.ci.key === undefined
          ? this.state.ci.name
          : this.state.ci.key;
      let sKey = this.state.chosenDate + key;
      ref.child(sKey).update({ description: this.state.shortDescription });

      //ref to history table
      ref = firebase.database().ref("history");
      ref
        .child(key)
        .child(this.state.chosenDate)
        .update({ description: this.state.shortDescription });

      this.setState({ needRefresh: true });

      alert("Cập nhật thành công!");
    }
  }

  checkValid() {
    if (
      this.state.chosenDate.length === 0 ||
      this.state.shortDescription.length === 0
    ) {
      showError(m1);
      return false;
    }
    if (compareDateWithNow(this.state.chosenDate) <= 0) {
      showError(m2);
      return false;
    }

    return true;
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
            <Title style={styles.appHeaderFont}>
              {this.state.mode === "create" ? "Thêm lịch sử" : "Sửa lịch sử"}
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() =>
                this.state.mode === "create"
                  ? this.createSchedule()
                  : this.updateSchedule()
              }
            >
              <Icon
                type="FontAwesome"
                name="save"
                style={styles.appHeaderIcon}
              />
            </Button>
          </Right>
        </Header>
        <Content padder>
          <Item>
            <Left>
              <Title style={styles.historyAddTextStyle}>Ngày hẹn : </Title>
            </Left>
            <Body>
              <DatePicker
                defaultDate={new Date()}
                locale={"vi"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText={
                  this.state.chosenDate === ""
                    ? "Chọn ngày hẹn : "
                    : prettifyStringDate(this.state.chosenDate)
                }
                textStyle={styles.datePickerTextStyle}
                placeHolderTextStyle={styles.datePickerStyle}
                onDateChange={this.setDate}
              />
            </Body>
          </Item>
          <Form>
            <Textarea
              style={styles.inputTextAreaFont}
              value={this.state.shortDescription}
              rowSpan={8}
              bordered
              placeholder="Thông tin đặt đồ"
              onChangeText={text => this.setState({ shortDescription: text })}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
