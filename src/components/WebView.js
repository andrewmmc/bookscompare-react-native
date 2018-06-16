import React, { Component } from 'react';
import { StyleSheet, WebView as Web, TouchableOpacity, Linking } from 'react-native';
import { Container, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  'icon': {
    fontSize: 30,
    color: 'rgba(202, 93, 59, 1)',
    marginRight: 10
  },
});

export default class WebView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params: { title, showActionSheet } } = navigation.state;
    return {
      title: title || 'WebView',
      headerTintColor: 'rgba(202, 93, 59, 1)',
      headerTitleStyle: {
        color: '#000000',
      },
      headerRight: (
        <TouchableOpacity onPress={showActionSheet} title='在其他瀏覽器開啟'>
          <Icon name='ios-open-outline' style={styles.icon} />
        </TouchableOpacity>
      )
    };
  };

  componentWillMount () {
    const { navigation: { setParams, state: { params: { url } } } } = this.props;
    setParams({
      showActionSheet: () => { this.showActionSheet(url) }
    })
  };

  showActionSheet = url => {
    const options = ['以 Safari 開啟', '取消'];
    ActionSheet.show(
      {
        title: '在其他瀏覽器開啟',
        options,
        cancelButtonIndex: (options.length - 1),
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            Linking.openURL(url);
            break;
          case (options.length - 1):
          default:
            break;
        }
      }
    )
  };

  render() {
    const { navigation: { state: { params: { url } } } } = this.props;

    return (
      <Container style={styles.pageContainer}>
        <Web
          source={{ uri: url }}
        />
      </Container>
    );
  };
}
