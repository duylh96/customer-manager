/**
 * This class define sidebar of App
 * @author : Hoang Duy
 */

import React, { Component } from "react";
import { Image, ImageBackground } from "react-native";
import {
  Container,
  Text,
  Button,
  List,
  ListItem,
  Icon,
  Left,
  Body
} from "native-base";
import { styles } from "../../styles/Styles.js";

const options = [
  {
    key: "Home",
    val: "Trang chủ",
    icon: "ios-home"
  },
  {
    key: "Customer",
    val: "Danh sách khách hàng",
    icon: "ios-contacts"
  },
  {
    key: "Recent",
    val: "Khách hàng gần đây",
    icon: "ios-timer"
  },
  {
    key: "Utils",
    val: "Tiện ích",
    icon: "md-calculator"
  },
  {
    key: "Settings",
    val: "Cài đặt",
    icon: "ios-settings"
  },
  {
    key: "About",
    val: "Thông tin",
    icon: "ios-information-circle"
  }
];

export default class Sidebar extends Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={require("./img/cover.jpg")}
          style={styles.sideBarCoverImage}
        >
          <Image
            square
            style={styles.sideBarLogoImage}
            source={require("./img/logo.png")}
          />
        </ImageBackground>
        <List
          dataArray={options}
          renderRow={data => {
            return (
              <Button
                iconLeft
                full
                transparent
                dark
                style={styles.sidebarOptionItem}
                onPress={() => this.props.navigation.navigate(data.key)}
              >
                <Icon style={styles.sidebarOptionItemFont} name={data.icon} />
                <Text style={styles.sidebarOptionItemFont}>{data.val}</Text>
              </Button>
            );
          }}
        />
      </Container>
    );
  }
}
