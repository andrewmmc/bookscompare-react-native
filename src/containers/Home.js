import React, { Component } from 'react';
import { StyleSheet, Linking } from 'react-native';
import {
  Text, Container,
  Header,
  Title,
  Content,
  Grid,
  Col,
  Form,
  Item,
  Input,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  'icon': {
    fontSize: 72,
    color: '#495963',
    textAlign: 'center',
  },
  'leadingText': {
    color: '#495963',
    fontSize: 16,
    paddingTop: 20,
    textAlign: 'center',
  },
  'pageContainer': {
    backgroundColor: '#FFFFFF',
    paddingLeft: 20,
    paddingRight: 20,
  },
  'textContainer': {
    paddingTop: 50,
    paddingBottom: 50,
  },
  'searchBtn': {
    marginTop: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgb(91, 184, 92)',
  },
  'searchBtnDisabled': {
    backgroundColor: 'rgba(91, 184, 92, 0.5)',
  },
});

export default class WhatsApp extends Component {
  static navigationOptions = {
    title: '比書價 BookCompare',
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isbnNumber: '',
    };
  };

  render() {
    const { isbnNumber } = this.state;

    return (
      <Container style={styles.pageContainer}>
        <Content>
          <Grid>
            <Col style={styles.textContainer}>
              <Icon name="ios-search" style={styles.icon}/>
              <Text style={styles.leadingText}>
                掃描或輸入書本的 ISBN 碼，讓您輕鬆以最心儀的價格買入！
              </Text>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <Form>
                <Item style={styles.inputContainer} regular>
                  <Input
                    keyboardType='numeric'
                    onChangeText={(value) => {
                      this.setState({ isbnNumber: value });
                    }}
                    placeholder='ISBN 碼'/>
                </Item>
                <Button
                  onPress={() => {}}
                  style={( isbnNumber === '' ) ? [styles.searchBtn, styles.searchBtnDisabled] : styles.searchBtn}
                  disabled={ isbnNumber === '' }
                  title='搜尋好書價'>
                  <Text>搜尋好書價</Text>
                </Button>
              </Form>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
