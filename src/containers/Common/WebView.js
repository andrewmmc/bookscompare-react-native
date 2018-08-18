import React, { Component } from 'react';
import { StyleSheet, WebView as Web, TouchableOpacity, Linking, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { Container, Content, Grid, Col, Text, ActionSheet } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import { GATracker } from '../../utils/tracker';
import { HeaderStyle } from '../../common/style';

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    flex: 1,
  },
  'actionIcon': {
    fontSize: 30,
    color: 'rgba(202, 93, 59, 1)',
    marginRight: 10
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
  'infoContainer': {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'icon': {
    fontSize: 72,
    color: 'rgba(68, 66, 65, 1)',
    textAlign: 'center',
  },
  'leadText': {
    color: 'rgba(68, 66, 65, 1)',
    fontSize: 22,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  'describeText': {
    color: 'rgba(68, 66, 65, 1)',
    fontSize: 16,
    textAlign: 'center',
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
          <Icon name='ios-share' style={styles.actionIcon} />
        </TouchableOpacity>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  componentWillMount () {
    const { navigation: { setParams, state: { params: { url } } } } = this.props;
    setParams({
      actionSheet: () => { this.showActionSheet(url) }
    })
  };

  showActionSheet = url => {
    // Google Analytics tracking
    GATracker.trackEvent('WebView', 'Show Action Sheet');

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

  onLoad = () => {
    this.setState({ loading: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { navigation: { state: { params: { url } } } } = this.props;
    const { loading, error } = this.state;

    return (
      <Container style={styles.pageContainer}>
        { !error &&
          <Web
            onLoad={this.onLoad}
            onError={this.onError}
            source={{ uri: url }}
          />
        }
        { loading && !error &&
          <ActivityIndicator animating={loading} style={styles.activityIndicator} />
        }
        {
          // TODO: Move to error message components
        }
        { error &&
        <Content scrollEnabled={false}>
          <Grid>
            <Col style={styles.infoContainer}>
              <Icon name="ios-sad" style={styles.icon}/>
              <Text style={styles.leadText}>
                未能載入內容
              </Text>
              <Text style={styles.describeText}>
                請檢查您的網絡連接。{'\n'}如持續遇到此問題，請聯絡我們以取得協助。
              </Text>
            </Col>
          </Grid>
        </Content>
        }
      </Container>
    );
  };
}
