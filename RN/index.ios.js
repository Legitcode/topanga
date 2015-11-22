/* @flow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput
} = React;
window.navigator.userAgent = "react-native";

var io = require("socket.io-client/socket.io");

class Chat extends React.Component{

  constructor(){
    super()
    this.state = {
      messages: []
    }
    this.socket = io("ws://10.10.30.141:8080", {jsonp: false});
  }

  componentDidMount(){
    this.socket.emit('username', 'zach')
    this.socket.on('message', message => {
      let messages = this.state.messages
      messages.push(message)
      this.setState({messages})
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.messages.map(message => <Text>{message.username}: {message.text}</Text>)}
          <TextInput
            style={styles.input}
            onChangeText={text => this.setState({text})}
            value={this.state.text}
            onSubmitEditing={() =>{
              this.socket.emit('message', this.state.text)
              this.setState({text: null})
            }}
            blurOnSubmit={false}
            autoFocus={true}
            returnKeyType="send"
          />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input:{
    marginTop: 135,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('chat', () => Chat);
