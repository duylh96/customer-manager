/**
 * This is Editor Screen class
 * @author : Hoang Duy
 */
import React, { Component } from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/Styles.js";

export class EditorScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>This is edit screen!</Text>
      </View>
    );
  }
}
