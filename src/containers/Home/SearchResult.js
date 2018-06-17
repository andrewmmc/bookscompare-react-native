import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, Thumbnail, Grid, Col, Text, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderStyle } from '../../common/style';

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  'activityIndicatorContainer': {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  'activityIndicator': {
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
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
  'priceContainer': {
    alignItems: 'flex-end',
  },
  'currency': {
    color: 'rgba(143, 143, 143, 1)',
    fontSize: 12,
  },
  'price': {
    color: 'rgba(202, 93, 59, 1)',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const SEARCH_URL = 'https://us-central1-book-price-app.cloudfunctions.net/book/isbn/';

export default class SearchResult extends Component {
  static navigationOptions = {
    title: '搜尋結果',
    ...HeaderStyle,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      isbnNumber: '',
      data: [],
    };
  }

  componentDidMount() {
    const { navigation: { state: { params: { isbnNumber } } } } = this.props;
    this.setState({ isbnNumber });
    this.getSearchResult(isbnNumber);
  }

  getSearchResult(isbnNumber) {
    this.setState({ data: [] });
    this.onFetch(isbnNumber);
  }

  async onFetch(isbnNumber) {
    this.setState({ loading: true });
    try {
      const { data: { data } } = await axios.get(SEARCH_URL + isbnNumber);
      this.setState({ loading: false, data });
    } catch (e) {
      console.error(e);
      // Alert.alert('發生未知錯誤', '請檢查您的網絡連接。', [{ text: '好' }], { cancelable: false });
      this.setState({ loading: false, error: true });
    }
  }

  navigateToWebView = (url, name, source) => {
    const { navigation: { navigate } } = this.props;
    navigate('SearchWebView', { url: url, title: `${source} - ${name}`, showOptions: true })
  };

  render() {
    const { loading, error, data } = this.state;
    const activeData = data.filter((item) => item.active);

    const renderItem = ({ item }) => (
      <ListItem onPress={() => this.navigateToWebView(item.url, item.name, item.source)}>
        <Thumbnail square size={80} source={ item.image ? { uri: item.image } : {} }/>
        <Body>
        <Text>{item.source}: {item.name}</Text>
        <Text note>{item.authors}</Text>
        <Text note>{item.publisher}</Text>
        </Body>
        <Right style={styles.priceContainer}>
          <Text style={styles.currency}>{item.currency}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </Right>
      </ListItem>
    );

    return (
      <Container style={styles.pageContainer}>
        {loading && !error &&
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={loading} style={styles.activityIndicator} />
        </View>
        }
        { activeData.length > 0 && !loading && !error &&
          <View style={{ flex: 1 }}>
            <ListItem itemDivider>
              <Text>共找到 {activeData.length} 個結果。</Text>
            </ListItem>
            <FlatList
              data={activeData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshing={loading}
            />
          </View>
        }
        { activeData.length <= 0 && !loading && !error &&
          <Content scrollEnabled={false}>
            <Grid>
              <Col style={styles.infoContainer}>
                <Icon name="ios-sad-outline" style={styles.icon}/>
                <Text style={styles.leadText}>
                  未能找到結果
                </Text>
                <Text style={styles.describeText}>
                  抱歉，找不到所搜尋書本的價格資料。{'\n'}
                  您慣用的網絡書店不在名單上？{'\n'}
                  歡迎提交意見給我們！
                </Text>
              </Col>
            </Grid>
          </Content>
        }
        { !loading && error &&
        <Content scrollEnabled={false}>
          <Grid>
            <Col style={styles.infoContainer}>
              <Icon name="ios-sad-outline" style={styles.icon}/>
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
  }
}
