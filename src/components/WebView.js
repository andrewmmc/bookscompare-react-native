import React, { Component } from 'react';
import { StyleSheet, WebView as Web } from 'react-native';
import { Container } from 'native-base';

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF',
  },
});

export default class WebView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params;
    return {
      title: title || 'WebView',
    };
  };

  render() {
    const { url } = this.props.navigation.state.params;

    return (
      <Container style={styles.pageContainer}>
        <Web
          source={{ uri: url }}
        />
      </Container>
    );
  }
}
