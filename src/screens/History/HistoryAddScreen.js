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

export default class HistoryAddScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "",
      chosenDate: new Date()
    };
    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }

  componentDidMount() {
    let { navigation } = this.props;
    this.setState({ mode: navigation.getParam("mode", "") });
    let val = navigation.getParam("id", "");
    alert(val);
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
            <Button transparent onPress={() => navigation.goBack("")}>
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
                placeHolderText="Chọn ngày hẹn"
                textStyle={styles.datePickerTextStyle}
                placeHolderTextStyle={styles.datePickerStyle}
                onDateChange={this.setDate}
              />
            </Body>
          </Item>
          <Form>
            <Textarea
              style={styles.inputTextAreaFont}
              rowSpan={8}
              bordered
              placeholder="Thông tin đặt đồ"
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
