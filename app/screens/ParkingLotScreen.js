import React, { Component } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Card, Button, Text,SearchBar} from 'react-native-elements';
import { FontAwesome } from "@expo/vector-icons";

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
  
  render() {
    return (<View 
              style={{
                flex: 1,
                backgroundColor: "#2980b9"
              }}
            >
                <SearchBar
                  lightTheme
                  onChangeText={(text) => this.setState({text})}
                  onClearText={function (params) {

                  }}
                  placeholder='Filtrar' />               
<Card
  title='HELLO WORLD'
  image={require('../images/teste.jpg')}>
  <Text style={{marginBottom: 10}}>
    The idea with React Native Elements is more about component structure than actual design.
  </Text>
  <Button
    icon={{name: 'code'}}
    backgroundColor='#03A9F4'
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card>

            </View>);
  }
}

export default ParkingLotScreen;
