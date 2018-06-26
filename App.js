/**
Customer Manager App
author : Hoang Duy
**/

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import {HomeScreen} from './views/HomeScreen';
import {EditorScreen} from './views/EditorScreen';


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Editor: EditorScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends Component < Props > {
    render() {
        return ( 
          <RootStack / >
        );
    }
}