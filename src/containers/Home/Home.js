import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Container, Content, Grid, Col, Form, Item, Input, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderStyle } from '../../common/style';

const styles = StyleSheet.create({
  'icon': {
    fontSize: 72,
    color: 'rgba(68, 66, 65, 1)',
    textAlign: 'center',
  },
  'leadingText': {
    color: 'rgba(68, 66, 65, 1)',
    fontSize: 16,
    paddingTop: 20,
    textAlign: 'center',
  },
  'pageContainer': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingLeft: 20,
    paddingRight: 20,
  },
  'textContainer': {
    paddingTop: 50,
    paddingBottom: 50,
  },
  'scannerBtn': {
    backgroundColor: 'rgba(68, 66, 65, 1)',
  },
  'scannerBtnIcon': {
    fontSize: 22,
    color: 'rgba(255, 255, 255, 1)',
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
    backgroundColor: 'rgba(202, 93, 59, 1)',
  },
  'searchBtnDisabled': {
    backgroundColor: 'rgba(202, 93, 59, 0.5)',
  },
});

export default class Home extends Component {
  static navigationOptions = {
    title: '好書價 BooksCompare',
    ...HeaderStyle,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isbnNumber: '',
    };
  };

  validateIsbnNumber() {
    const { isbnNumber } = this.state;
    return (isbnNumber !== '' && (isbnNumber.length === 10 || isbnNumber.length === 13))
  };

  onInputChange = value => {
    this.setState({ isbnNumber: value });
  };

  navigateToScanner = () => {
    const { navigation: { navigate } } = this.props;
    navigate('BarcodeScanner');
  };

  navigateToResult = () => {
    const { isbnNumber } = this.state;
    const { navigation: { navigate } } = this.props;
    navigate('SearchResult', { isbnNumber });
  };

  render() {
    const { isbnNumber } = this.state;

    return (
      <Container style={styles.pageContainer}>
        <Content scrollEnabled={false}>
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
                        onChangeText={this.onInputChange}
                        value={isbnNumber}
                        placeholder='ISBN 碼'
                        maxLength={13}
                      />
                    </Item>
                  </Col>
                  <Col size={5} />
                  <Col size={15} style={styles.scannerBtnContainer}>
                    <Button
                      onPress={this.navigateToScanner}
                      style={styles.scannerBtn}
                      title='掃描'>
                      <Text><Icon name="ios-barcode-outline" style={styles.scannerBtnIcon}/></Text>
                    </Button>
                  </Col>
                </Grid>
                <Button
                  onPress={this.navigateToResult}
                  style={this.validateIsbnNumber()
                    ? styles.searchBtn
                    : [styles.searchBtn, styles.searchBtnDisabled]}
                  disabled={!this.validateIsbnNumber()}
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
