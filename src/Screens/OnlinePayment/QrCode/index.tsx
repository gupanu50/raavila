import {Images} from '@/Assets';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';
import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-clipboard/clipboard';

export default function QrCode(props: any) {
  const {data, amount} = props;


  const copyToClipboard = async (txt: string) => {
    Clipboard.setString(txt);
    showMessage({
      message: `${data?.upi_id} copied in clipboard`,
      type: 'success',
      autoHide: true,
      duration: 1000,
    });
  };

  return (
    <>
      <Image source={Images.line} style={styles.line} />
      <View style={styles.payment}>
        <Text style={styles.txt}>{'Payable Amount'}</Text>
        <Text style={styles.txt}>
          {'\u20B9'} {amount}
        </Text>
      </View>
      <Image source={Images.line} style={[styles.line, {marginTop: 0}]} />
      <Text style={[styles.txt, {textAlign: 'center', marginTop: adjust(10)}]}>
        {'Please scan the below QR code \n to complete the transaction'}
      </Text>
      <View style={styles.qrView}>
        <Image source={{uri: data?.qrcode}} style={styles.qrImg} />
      </View>
      <View style={[styles.payment, {height: adjust(20)}]}>
        <Image
          source={Images.line}
          style={[styles.line, {marginTop: 0, width: '40%'}]}
        />
        <Text style={styles.txt}>{'or'}</Text>
        <Image
          source={Images.line}
          style={[styles.line, {marginTop: 0, width: '40%'}]}
        />
      </View>
      <Text
        style={[styles.txt, {textAlign: 'center', marginVertical: adjust(5)}]}>
        {'Copy below UPI ID'}
      </Text>
      <View
        style={[
          styles.payment,
          {
            height: adjust(40),
            borderWidth: 1,
            borderColor: COLORS.BORDER_COLOR,
            borderRadius: adjust(5),
            backgroundColor: 'white',
          },
        ]}>
        <Text style={[styles.txt, {paddingLeft: adjust(10)}]}>
          {data?.upi_id}
        </Text>
        <TouchableOpacity
          style={styles.copyBtn}
          onPress={() => copyToClipboard(data?.upi_id)}>
          <Image source={Images.copy} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
    color: COLORS.DARK,
  },
  line: {
    marginTop: adjust(15),
    width: '100%',
  },
  payment: {
    height: adjust(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrView: {
    alignItems: 'center',
    height: adjust(250),
    justifyContent: 'center',
  },
  copyBtn: {
    height: '100%',
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrImg: {
    resizeMode: 'stretch',
    height: '100%',
    width: '80%',
  },
});
