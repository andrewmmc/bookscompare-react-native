import React, { Component } from 'react';
import { FlatList, Image, Linking, StyleSheet } from 'react-native';
import { Text, Container, Content, Grid, ListItem, Col, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderStyle } from '../../common/style';
import AppLogo from '../../assets/logo.png';

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  'infoContainer': {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'appIcon': {
    width: 96,
    height: 96,
  },
  'leadText': {
    color: 'rgba(68, 66, 65, 1)',
    fontSize: 18,
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  'describeText': {
    color: 'rgba(68, 66, 65, 1)',
    fontSize: 14,
    textAlign: 'center',
  },
  'iconContainer': {
    width: 35,
  },
  'icon': {
    fontSize: 24,
    color: 'rgba(202, 93, 59, 1)'
  },
  'arrow': {
    fontSize: 20,
    color: 'rgba(213, 213, 213, 1)'
  },
});

export default class About extends Component {
  static navigationOptions = {
    title: '關於我們',
    ...HeaderStyle,
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        'title': '使用條款及私隱政策',
        'icon': 'ios-information-circle',
        'url': 'https://book-price-app.firebaseapp.com/privacy_policy.html',
        'inApp': true,
      }, {
        'title': '免責聲明',
        'icon': 'logo-buffer',
        'url': 'https://book-price-app.firebaseapp.com/declaration.html',
        'inApp': true,
      }, {
        'title': '評分及提交意見',
        'icon': 'md-star',
        'url': 'https://book-price-app.firebaseapp.com/feedback.html',
        'inApp': true,
      }, {
        'title': '(c) 2018 Andrew Mok',
        'icon': 'ios-home',
        'url': 'https://andrewmmc.com',
        'inApp': false,
      }]
    }
  }

  navigateToWebView(title, url, inApp) {
    const { navigation: { navigate } } = this.props;
    if (inApp) {
      navigate('AboutWebView', { url, title })
    } else {
      Linking.openURL(url)
    }
  };

  render() {
    const { items } = this.state;

    const renderItem = ({ item }) => (
      <ListItem icon onPress={() => this.navigateToWebView(item.title, item.url, item.inApp)}>
        <Left style={styles.iconContainer}>
          <Icon name={item.icon} style={styles.icon} />
        </Left>
        <Body>
        <Text>{item.title}</Text>
        </Body>
        <Right>
          <Icon name='ios-arrow-forward' style={styles.arrow} />
        </Right>
      </ListItem>
    );

    return (
      <Container style={styles.pageContainer}>
        <Content scrollEnabled={false}>
          <Grid>
            <Col style={styles.infoContainer}>
              <Image style={styles.appIcon} source={AppLogo} />
              <Text style={styles.leadText}>
                好書價 BooksCompare
              </Text>
              <Text style={styles.describeText}>
                版本 v.1.0.1
              </Text>
            </Col>
          </Grid>
          <Grid>
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
            />
          </Grid>
        </Content>
      </Container>
    );
  }
}
