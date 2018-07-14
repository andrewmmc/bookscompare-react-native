import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { HeaderStyle } from '../../common/style';
import { GATracker } from '../../utils/tracker';

const styles = StyleSheet.create({
  'container': {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  'preview': {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  'helpTextContainer': {
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: (Dimensions.get('window').height / 2) - 200,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'helpText': {
    color: 'rgba(255, 255, 255, 1)',
    paddingBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  'helpTextBox': {
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 1)',
    width: 300,
    height: 100,
  }
});

export default class BarcodeScanner extends Component {
  static navigationOptions = {
    title: '國際標準書號掃描',
    ...HeaderStyle,
  };

  constructor(props) {
    super(props);
    this.state = {
      shouldReadBarcode: true,
    };
  };

  onBarcodeRead = (e) => {
    const { navigation: { navigate } } = this.props;
    const { type, data } = e;
    if (type === 'org.gs1.EAN-13') {
      // Google Analytics tracking
      GATracker.trackEvent('BarcodeScanner', 'Read Valid ISBN Barcode');

      navigate('SearchResult', { isbnNumber: data });
    } else {
      // Google Analytics tracking
      GATracker.trackEvent('BarcodeScanner', 'Read Invalid ISBN Barcode');
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
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>請將國際標準書號 (ISBN 碼) 放進掃描框內。</Text>
          <View style={styles.helpTextBox}/>
        </View>
      </View>
    );
  }
}
