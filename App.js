/**
 * Customer Manager App
 * @author : Hoang Duy
 */

import React, { Component } from "react";
import { Root } from "native-base";
import MainScreen from "./src/screens/Home/index.js";

export default class App extends Component {
  render() {
    return (
      <Root>
        <MainScreen />
      </Root>
    );
  }
}
