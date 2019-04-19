import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Dimensions
} from "react-native";
import { Header, Left, Icon } from "native-base";
import ButtonComponent from "../../components/ButtonComponent";
import { ButtonGroup } from "react-native-elements";

const { width } = Dimensions.get("window");

export default class CurrentTransactions extends React.Component {
  static navigationOptions = {
    drawerIcon: tintColor => (
      <Icon
        name="clock-o"
        type="FontAwesome"
        style={{ fontSize: 24, color: tintColor }}
      />
    )
  };
  constructor() {
    super();
    this.state = {
      selectedIndex: 2
    };
    this.updateIndex = this.updateIndex.bind(this);
  }
  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }
  render() {
    const buttons = ["All", "Current Only", "Past Only"];
    const { selectedIndex } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require("../../assets/group-dinner.jpg")}
          style={styles.imageContainer}
        >
          <View style={styles.overlay} />
          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text> current transactions</Text>
              <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 30 }}
              />
            </View>
            <View style={styles.infoContainer}>
              <ButtonComponent
                text="current transaction #1"
                // onPress={() => this.props.navigation.navigate('SplitByItem')}
                disabled={false}
                primary={true}
              />
              <ButtonComponent
                text="current transaction #1"
                // onPress={() => this.props.navigation.navigate('SplitByItem')}
                disabled={false}
                primary={true}
              />
              <ButtonComponent
                text="current transaction #1"
                // onPress={() => this.props.navigation.navigate('SplitByItem')}
                disabled={false}
                primary={true}
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  imageContainer: {
    resizeMode: "cover",
    flex: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(69,85,117,0.7)"
  },
  infoContainer: {
    flex: 2,
    width: width,
    padding: 20,
    justifyContent: "flex-end"
  }
});
