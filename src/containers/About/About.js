import React, { Component } from 'react';
import { StyleSheet, FlatList, Linking } from 'react-native';
import { Text, Container, Content, Grid, ListItem, Col, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  'appIcon': {
    fontSize: 72,
    color: 'rgba(68, 66, 65, 1)',
    textAlign: 'center',
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
  'pageContainer': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  'textContainer': {
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
  },
  'icon': {
    fontSize: 24,
    color: 'rgba(202, 93, 59, 1)'
  },
  'iconContainer': {
    width: 35,
  },
  'arrow': {
    fontSize: 20,
    color: 'rgba(213, 213, 213, 1)'
  },
});

export default class About extends Component {
  static navigationOptions = {
    title: '關於我們',
  };

  constructor(props) {
    super(props);
    this.state = {
      items: [{
        'title': '使用條款及私隱政策',
        'icon': 'ios-information-circle',
        'url': 'https://andrewmmc.com',
        'inApp': true,
      }, {
        'title': '免責聲明',
        'icon': 'logo-buffer',
        'url': 'https://andrewmmc.com',
        'inApp': true,
      }, {
        'title': '評分及提交意見',
        'icon': 'md-star',
        'url': 'https://andrewmmc.com',
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
            <Col style={styles.textContainer}>
              <Icon name="ios-search" style={styles.appIcon}/>
              <Text style={styles.leadText}>
                好書價 BookCompare
              </Text>
              <Text style={styles.describeText}>
                版本 v.1.0.0
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
