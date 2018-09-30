import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { FormLabel, FormInput, FormValidationMessage, Card, SearchBar} from 'react-native-elements';
import { FontAwesome } from "@expo/vector-icons";

const styles = {
  iconAlign: { alignSelf: "center"},
  drawerToggle: { padding: 20 },
  headerStyle: { backgroundColor: "#fff"},
  headerTitleStyle: {fontWeight: "bold"},
}

class RegisterUserScreen extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
              headerStyle: styles.headerStyle, 
              headerTintColor: "#000", 
              headerTitleStyle: styles.headerTitleStyle, 
              headerTitle: 'AMCOM',
              headerRight: (
                <TouchableOpacity
                    style={styles.drawerToggle}
                    onPress={() => {
                    navigation.navigate("DrawerToggle");
                }}>
                    <FontAwesome 
                        name="bars" 
                        size={28} 
                        color="#333333"/>
                </TouchableOpacity>
          )};
  };

  constructor(props) {
    super(props);
    this.state = {
      collaborator: [],
      text: ''
    };
  }

  componentDidMount(){
    this._retrieveData();
  }
  
  _retrieveData = async ()=> {
    try {
      
        let responseJson = {

        };

        this.setState({ dataItem: responseJson});
    } catch (error) {
        console.error(error);
    }
  }
  
  render() {
    return (<View 
              style={{
                flex: 1,
                backgroundColor: "#2980b9"
              }}
            >          
              <Card>
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={() =>{}}/>
                <FormValidationMessage>Error message</FormValidationMessage>


                <FormLabel>E-mail</FormLabel>
                <FormInput autoFocus onChangeText={() =>{}}/>
                <FormValidationMessage>Error message</FormValidationMessage>


                <FormLabel>Password</FormLabel>
                <FormInput onChangeText={() =>{}}/>
                <FormValidationMessage>Error message</FormValidationMessage>


                <FormLabel>Gender</FormLabel>
                <FormInput onChangeText={() =>{}}/>
                <FormValidationMessage>Error message</FormValidationMessage>
              </Card>
            </View>);
  }
}

export default RegisterUserScreen ;
