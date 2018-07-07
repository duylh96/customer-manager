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
  Title
} from "native-base";
import { styles } from "../../styles/Styles.js";
import {
  listCustomerKey,
  customerDescriptionTemplate
} from "../../utils/global.js";

export default class CustomerAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "create",
      customer: new Object(),
      nameSuccess: "",
      phoneSuccess: ""
    };
  }

  componentDidMount() {
    this.setState({ mode: this.props.navigation.getParam("mode", "create") });
  }

  showInputIcon(success) {
    switch (success) {
      case "success":
        return <Icon name="checkmark-circle" />;
        break;
      case "error":
        return <Icon name="close-circle" />;
        break;
      default:
        break;
    }
  }

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam("val", "");
    return (
      <Container>
        <Header style={styles.appHeader}>
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
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
            <Button transparent>
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
            <Item floatingLabel>
              <Label>Tên khách hàng</Label>
              <Input
                style={styles.inputItemFont}
                value={this.state.mode === "edit" ? data.name : ""}
              />
              {this.showInputIcon(this.state.nameSuccess)}
            </Item>
            <Item floatingLabel last>
              <Label>Số điện thoại</Label>
              <Input
                style={styles.inputItemFont}
                value={this.state.mode === "edit" ? data.phone : ""}
              />
              {this.showInputIcon(this.state.phoneSuccess)}
            </Item>
            <Textarea
              style={styles.inputTextAreaFont}
              rowSpan={25}
              bordered
              placeholder="Số đo chi tiết"
              value={
                this.state.mode === "create"
                  ? customerDescriptionTemplate
                  : data.description
              }
            />
          </Form>
        </Content>
      </Container>
    );
  }
}
