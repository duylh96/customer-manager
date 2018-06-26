/**
 * This is Home Screen class
 * @author : Hoang Duy
 */
import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { styles } from "../styles/Styles.js";

export class HomeScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}> Welcome to React Native! </Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Button
          title="Go to Editor"
          onPress={() => this.props.navigation.navigate("Editor")}
        />
      </View>
    );
  }
}
