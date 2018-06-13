import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  Text,
  Container,
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
  'scannerBtn': {
    backgroundColor: '#495963',
  },
  'scannerBtnIcon': {
    fontSize: 22,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  'scannerBtnContainer': {
    paddingTop: 2,
    paddingBottom: 2,
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
    const { navigation: { navigate } } = this.props;

    return (
      <Container style={styles.pageContainer}>
        <Content>
          <Grid>
            <Col style={styles.textContainer}>
              <Icon name="ios-search" style={styles.icon}/>
              <Text style={styles.leadingText}>
                掃描或輸入書本的國際標準書號 (ISBN 碼)，讓您輕鬆以最心儀的價格買入！
              </Text>
            </Col>
          </Grid>
          <Grid>
            <Col>
              <Form>
                <Grid>
                  <Col size={85}>
                    <Item style={styles.inputContainer} regular>
                      <Input
                        keyboardType='numeric'
                        onChangeText={(value) => {
                          this.setState({ isbnNumber: value });
                        }}
                        placeholder='ISBN 碼'/>
                    </Item>
                  </Col>
                  <Col size={5} />
                  <Col size={15} style={styles.scannerBtnContainer}>
                    <Button
                      onPress={() => navigate('BarcodeScanner')}
                      style={styles.scannerBtn}
                      title='掃描'>
                      <Text><Icon name="ios-barcode-outline" style={styles.scannerBtnIcon}/></Text>
                    </Button>
                  </Col>
                </Grid>
                <Button
                  onPress={() => navigate('SearchResult', { isbnNumber })}
                  style={(isbnNumber !== '' && (isbnNumber.length === 10 || isbnNumber.length === 13))
                    ? styles.searchBtn
                    : [styles.searchBtn, styles.searchBtnDisabled]}
                  disabled={!(isbnNumber !== '' && (isbnNumber.length === 10 || isbnNumber.length === 13))}
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
