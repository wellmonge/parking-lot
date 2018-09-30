import React, { Component } from "react";
import { StatusBar, View, Platform } from "react-native";
import { Provider, connect } from "react-redux";
import { SwitchNavigator, StackNavigator } from 'react-navigation'; 

//## APP COMPONENTS ###//
import { Drawer,Tabs, AuthStack } from "./app/Navigators";
// import { Store } from "./app/SetupStore";

class App extends Component {

  render() {
    const navigation =this.props.navigation;
      return (
          <View style={{ flex: 1 }}>
            {Platform.OS === "ios" ? <Tabs  /> : <Drawer />}
          </View>
    );
  }
}

export default SwitchNavigator(
  {
    App: App,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
);