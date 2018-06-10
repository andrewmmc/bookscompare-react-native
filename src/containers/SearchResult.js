import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Alert, FlatList, View } from 'react-native';
import { Container, ListItem, Thumbnail, Separator, Text, Body, Right } from 'native-base';

const styles = StyleSheet.create({
  'pageContainer': {
    backgroundColor: '#FFFFFF',
  },
  'priceContainer': {
    alignItems: 'flex-end',
  },
  'currency': {
    color: '#8F8F8F',
    fontSize: 12,
  },
  'price': {
    color: '#BE4557',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const SEARCH_URL = 'https://us-central1-book-price-app.cloudfunctions.net/book/isbn/';

export default class SearchResult extends Component {
  static navigationOptions = {
    title: '搜尋結果',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isbnNumber: '4717702901592',
      data: [],
    };
  }

  componentDidMount() {
    this.getSearchResult();
  }

  // onRefresh() {
  //   this.getSearchResult();
  // }

  getSearchResult() {
    const { isbnNumber } = this.state;
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
      Alert.alert('Error', 'Please check your internet connection.', [{ text: 'OK' }], { cancelable: false });
    }
  }

  render() {
    const { loading, data } = this.state;
    const { navigation: { navigate } } = this.props;

    const activeData = data.filter((item) => item.active);
    // const renderData = new List(activeData).sort('price', { order: 'desc' });

    const renderItem = ({ item }) => (
      <ListItem onPress={() => navigate('SearchWebView', { url: item.url, title: `${item.source} - ${item.name}` })}>
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
      </Container>
    );
  }
}
