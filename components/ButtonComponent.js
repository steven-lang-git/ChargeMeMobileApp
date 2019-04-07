import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

class ButtonComponent extends Component {
	render() {
		const { text, onPress, disabled, primary} = this.props;
		return (
      <View style={disabled?styles.disabled:styles.enabled}>
  		  <TouchableOpacity style={primary?styles.blueButton:styles.redButton}
  			   onPress={() => onPress()}
           disabled={disabled}
  		  >
  			 <Text style={styles.textStyle}>{text}</Text>
  		  </TouchableOpacity>
      </View>
		);
	}
}

ButtonComponent.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
	primary: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize:18,
  	color: 'white',
  	textAlign: 'center'
  },
  blueButton: {
  	padding:15,
  	backgroundColor: '#202646',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#35b0d2',
    backgroundColor: '#35b0d2',
  },
	redButton: {
		padding:15,
  	backgroundColor: '#202646',
    borderRadius:10,
    borderWidth: 1,
    borderColor: 'coral',
    backgroundColor: 'coral',
	},
  disabled: {
    flex:1,
    opacity: 0.3,
  },
  enabled: {
    flex:1,
    opacity: 1,
  },
});

export default withNavigation(ButtonComponent);
