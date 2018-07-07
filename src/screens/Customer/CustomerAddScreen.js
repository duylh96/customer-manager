/**
 * This class define Customer Add Screen
 * @author Hoang Duy
 */
import React, { Component } from "react";
import {
  Container,
  Header,
  Left,
  Right,
  Body,
  Button,
  Text,
  Icon,
  Title
} from "native-base";
import { styles } from "../../styles/Styles.js";

export default class CustomerAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "create"
    };
  }
  componentDidMount() {
    this.setState({ mode: this.props.navigation.getParam("mode", "create") });
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
          <Right />
        </Header>
      </Container>
    );
  }
}
