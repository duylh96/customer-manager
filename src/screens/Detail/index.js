import React, { Component } from "react";
import Detail from "./Detail.js";
import History from "./History.js";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
export default (DetailNavigator = TabNavigator(
  {
    Detail: { screen: Detail },
    History: { screen: History }
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Detail")}
            >
              <Icon name="ios-card-outline" />
              <Text>Chi tiết</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("History")}
            >
              <Icon name="ios-list-box-outline" />
              <Text>Lịch sử đặt đồ</Text>
            </Button>
          </FooterTab>
        </Footer>
      );
    }
  }
));
