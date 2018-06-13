import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

const styles = StyleSheet.create({
  'container': {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
  },
  'preview': {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});

export default class BarcodeScanner extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '國際標準書號掃描',
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      shouldReadBarcode: true,
    };
  };

  onBarcodeRead = (e) => {
    // {
    //   data: '9789888206681',
    //   target: 86,
    //   type: 'org.gs1.EAN-13',
    //   bounds:
    //     {
    //       size: {
    //         width: '178.204268',
    //         height: '1.041691',
    //       },
    //       origin: {
    //         x: '89.956753',
    //         y: '347.062492',
    //       },
    //     },
    // }
    const { navigation: { navigate } } = this.props;
    const { type, data } = e;
    if (type === 'org.gs1.EAN-13') {
      // this.setState({ shouldReadBarcode: false });
      navigate('SearchResult', { isbnNumber: data });
    }
  };

  render() {
    const { shouldReadBarcode } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          onBarCodeRead={shouldReadBarcode ? this.onBarcodeRead : null}
          permissionDialogTitle={'相機權限'}
          permissionDialogMessage={'本應用程式需要取得相機權限以提供國際標準書號 (ISBN 碼) 掃描功能。'}
        />
      </View>
    );
  }
}
