import React, { Component } from 'react';
import { StyleSheet, WebView as Web, TouchableOpacity, Linking, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { Container, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderStyle } from '../../common/style';

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
  'activityIndicator': {
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    height: 100,
    width: 100,
    borderRadius: 10,
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) - 150,
    left: (Dimensions.get('window').width / 2) - (100 / 2)
  },
  'icon': {
    fontSize: 30,
    color: 'rgba(202, 93, 59, 1)',
    marginRight: 10
  },
});

export default class WebView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params: { title, actionSheet, showOptions } } = navigation.state;
    return {
      title: title || 'WebView',
      ...HeaderStyle,
      headerRight: (
        showOptions &&
        <TouchableOpacity onPress={actionSheet} title='在其他瀏覽器開啟'>
          <Icon name='ios-open-outline' style={styles.icon} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount () {
    const { navigation: { setParams, state: { params: { url } } } } = this.props;
    setParams({
      actionSheet: () => { this.showActionSheet(url) }
    })
  };

  showActionSheet = url => {
    const options =
      (Platform.OS === 'ios')
      ? ['以 Safari 開啟', '取消']
      : ['以預設瀏覽器開啟', '取消'];

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

  onLoad() {
    this.setState({ loading: false });
  }

  render() {
    const { navigation: { state: { params: { url } } } } = this.props;
    const { loading } = this.state;

    return (
      <Container style={styles.pageContainer}>
        <Web
          onLoad={() => this.onLoad()}
          source={{ uri: url }}
        />
        {loading &&
          <ActivityIndicator animating={loading} style={styles.activityIndicator} />
        }
      </Container>
    );
  };
}
