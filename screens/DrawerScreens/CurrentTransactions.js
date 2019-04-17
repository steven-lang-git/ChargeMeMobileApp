import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import {
  Header,
  Left,
  Icon
} from 'native-base'

export default class CurrentTransactions extends React.Component {
  static navigationOptions ={
    drawerIcon: (tintColor) =>(
      <Icon name="clock-o" type="FontAwesome" style={{fontSize:24, color:tintColor }}/>
    )
  }
  constructor(){
    super();
    this.state={
      selectedIndex:2,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (selectedIndex){
    this.setState({selectedIndex})
  }
  render() {
    const buttons = ['All', 'Current Only','Past Only']
    const {selectedIndex} = this.state;
    return (
      
      
      <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>

      <Text> current transactions</Text>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height:100}}
      />
      </View>
      

    );
  }
}


const styles = StyleSheet.create({
container:{
  flex: 1,

}

});
