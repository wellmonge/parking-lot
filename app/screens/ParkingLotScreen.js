import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import { Card, Button } from 'react-native-elements';
import { FontAwesome } from "@expo/vector-icons";
import { map } from "../../node_modules/rxjs/operators";

const styles = {
  iconAlign: { alignSelf: "center"},
  drawerToggle: { padding: 20 },
  headerStyle: { backgroundColor: "#fff"},
  headerTitleStyle: {fontWeight: "bold"},
}

class ParkingLotScreen extends Component {
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
                                  style={styles.iconAlign} 
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
        let response = await fetch(
            'https://aniversario.amcom.com.br/sistema/estacionamento'
        );
        let responseJson = await response.json();

        this.setState({collaborator: responseJson});
    } catch (error) {
        console.error(error);
    }
}


  // _retrieveData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@MySuperStore:collaborator');
  //     if (value !== null) {   
  //       this.setState({collaborator: JSON.parse(value)})
  //     }
  //    } catch (error) {
    
  //   }
  // }

  
  render() {
    return (<View 
              style={{
                flex: 1,
                backgroundColor: "#2980b9"
              }}
            >
              <Text>
                AMCOM
              </Text>
              <TextInput
                style={{height: 40, backgroundColor:'white', borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
            <Button title={'BUSCAR'} onPress={() => {
              
              if (this.state.collaborator.length > 0){
                
                  const filteredCollaborators = this.state.collaborator.filter((item)=>{
                    return item.PlacaCarro == this.state.text; 
                  });
                  alert(JSON.stringify(filteredCollaborators[0]));

              }else{
                alert('não encontrado');
              }
              

            }}>

            </Button>
            </View>);
  }
}

export default ParkingLotScreen;
