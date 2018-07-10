/**
 * This class define Customer Add Screen
 * @author Hoang Duy
 */
import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Label,
  Header,
  Left,
  Right,
  Body,
  Button,
  Item,
  Input,
  Text,
  Textarea,
  Icon,
  Title,
  Toast
} from "native-base";
import { styles } from "../../styles/Styles.js";
import {
  listCustomerKey,
  customerDescriptionTemplate
} from "../../utils/global.js";
import firebase from "react-native-firebase";

export default class CustomerAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "create",
      key: "",
      name: "",
      phone: "0",
      description: "",
      nameSuccess: "",
      phoneSuccess: "",
      needRefresh: false
    };
  }

  componentDidMount() {
    let { navigation } = this.props;
    let currentMode = navigation.getParam("mode", "create");
    this.setState({ mode: currentMode });

    //get data if in edit mode
    if (currentMode === "edit") {
      let data = navigation.getParam("val", "");
      this.setState({
        key: data.key !== undefined ? data.key : data.name,
        name: data.name,
        phone: data.phone,
        description: data.description
      });
    } else {
      this.setState({
        name: "",
        phone: "0",
        description: customerDescriptionTemplate
      });
    }
  }

  showNameInput(success, label, data) {
    switch (success) {
      case "success":
        return (
          <Item floatingLabel success>
            <Label>{label}</Label>
            <Input
              style={styles.inputItemFont}
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
            <Icon name="checkmark-circle" />
          </Item>
        );
        break;
      case "error":
        return (
          <Item floatingLabel error>
            <Label>{label}</Label>
            <Input
              style={styles.inputItemFont}
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
            <Icon name="close-circle" />
          </Item>
        );
        break;
      default:
        return (
          <Item floatingLabel>
            <Label>{label}</Label>
            <Input
              style={styles.inputItemFont}
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
          </Item>
        );
        break;
    }
  }

  showPhoneInput(success, label, data) {
    switch (success) {
      case "success":
        return (
          <Item floatingLabel success>
            <Label>{label}</Label>
            <Input
              style={styles.inputItemFont}
              value={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
            <Icon name="checkmark-circle" />
          </Item>
        );
        break;
      case "error":
        return (
          <Item floatingLabel error>
            <Label>{label}</Label>
            <Input
              style={styles.inputItemFont}
              value={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
            <Icon name="close-circle" />
          </Item>
        );
        break;
      default:
        return (
          <Item floatingLabel>
            <Label>{label}</Label>
            <Input
              style={styles.inputItemFont}
              value={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
          </Item>
        );
        break;
    }
  }

  saveInfo() {
    if (this.validateAllField()) {
      switch (this.state.mode) {
        case "create":
          this.createNewCustomer();
          this.cleanInput();
          break;
        case "edit":
          this.updateCustomer();
          break;
      }
    } else {
      this.showError("Các trường dữ liệu không thể bỏ trống!");
    }
  }

  updateCustomer() {
    //ref to customer table
    let ref = firebase.database().ref("customer");

    //update customer at key node
    ref.child(this.state.key).update({
      key: this.state.key,
      name: this.state.name,
      phone: this.state.phone,
      description: this.state.description
    });

    alert("Cập nhật thành công!");

    this.setState({ needRefresh: true });
  }

  createNewCustomer() {
    //ref to customer table
    let ref = firebase.database().ref("customer");

    //assign data to new object
    let customer = new Object();
    customer.key = this.state.name;
    customer.name = this.state.name;
    customer.phone = this.state.phone;
    customer.description = this.state.description;

    //add new node to customer table
    ref.child(customer.key).set(customer);

    this.setState({ needRefresh: true });
  }

  cleanInput() {
    this.setState({
      name: "",
      phone: "0",
      description: customerDescriptionTemplate
    });

    alert("Thêm khách hàng thành công!");
  }

  validateAllField() {
    let result = true;
    if (this.state.name.length === 0) {
      this.setState({ nameSuccess: "error" });
      result = false;
    } else {
      this.setState({ nameSuccess: "success" });
    }
    if (this.state.phone.length === 0) {
      this.setState({ phoneSuccess: "error" });
      result = false;
    } else {
      this.setState({ phoneSuccess: "success" });
    }
    if (this.state.description.length === 0) {
      result = false;
    }

    return result;
  }

  showError(error) {
    Toast.show({
      text: error,
      textStyle: { color: "red" },
      buttonText: "Okay",
      buttonTextStyle: { color: "#008000" },
      buttonStyle: { backgroundColor: "#5cb85c" },
      type: "warning",
      duration: 3000
    });
  }

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("val", "");
    return (
      <Container>
        <Header style={styles.appHeader}>
          <Left>
            <Button
              transparent
              onPress={() => {
                if (this.state.needRefresh) {
                  let customer = new Object();
                  customer.key =
                    this.state.key.length === 0
                      ? this.state.name
                      : this.state.key;
                  customer.name = this.state.name;
                  customer.phone = this.state.phone;
                  customer.description = this.state.description;
                  navigation.state.params.refresh(customer);
                }
                navigation.goBack();
              }}
            >
              <Icon name="arrow-back" style={styles.appHeaderIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.appHeaderFont}>
              {this.state.mode === "create"
                ? "Thêm khách hàng mới"
                : "Chỉnh sửa thông tin"}
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.saveInfo()}>
              <Icon
                type="MaterialIcons"
                name="save"
                style={styles.appHeaderIcon}
              />
            </Button>
          </Right>
        </Header>
        <Content>
          <Form>
            {this.showNameInput(this.state.nameSuccess, "Tên khách hàng", data)}
            {this.showPhoneInput(
              this.state.phoneSuccess,
              "Số điện thoại",
              data
            )}
            <Textarea
              style={styles.inputTextAreaFont}
              rowSpan={18}
              bordered
              placeholder="Số đo chi tiết"
              value={this.state.description}
              onChangeText={text => this.setState({ description: text })}
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
