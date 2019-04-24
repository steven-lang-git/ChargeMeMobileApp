import React, {Component} from 'react';
import {StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    SafeAreaView,
    Dimensions,
    FlatList,
    Button,
    TouchableHighlight} from 'react-native';
import Modal from "react-native-modal";

export default class MyModal extends Component {    
    render() {
      return (
          <View>
              <Modal
              backdropColor={'white'}
          backdropOpacity={1}
          animationIn={'zoomInDown'}
          animationOut={'zoomOutUp'}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
              visible={this.props.modalVisible}
              onRequestClose={() => { this.props.onDismiss() }}
              >
                  <View style={styles.container}>
                  <View style={styles.innerContainer}>
                        <Text style={styles.title}>Item Detail</Text>

                        <Text style={styles.description}>{this.props.selectedItem.name}</Text>
                        <TouchableHighlight
                            style={styles.buttonContainer}
                            onPress={this.props.hideModal}>
                            <Text style={styles.buttonText}>Close</Text> 
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
          </View>
      );
    }
  }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
            backgroundColor: 'transparent',
        },
        innerContainer: {
            borderRadius: 10,
            alignItems: 'center',
            backgroundColor: '#ecf0f1',
        },
        title: {
            color: '#bdc3c7',
            paddingTop: 10,
            paddingBottom: 10,
        },
        description: {
            color: '#bdc3c7',
            paddingTop: 10,
            paddingBottom: 10,
        },
        buttonContainer: {
            paddingVertical: 5,
            width: 100,
            backgroundColor: '#2c3e50',
            borderRadius: 10,
            marginTop: 20,
            marginBottom: 20,
        },
        buttonText: {
            textAlign: 'center',
            color: '#ecf0f1',
            fontWeight: '700'
        },
    });