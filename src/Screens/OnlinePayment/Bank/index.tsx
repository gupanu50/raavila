import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Images} from '@/Assets';
import adjust from '@/Component/adjust';
import {COLORS, FONT_FAMILIES} from '@/Configration';

export default function Bank(props: any) {
  const {data,amount} = props;

  return (
    <>
      <Image source={Images.line} style={styles.line} />
      <View style={styles.payment}>
        <Text style={styles.txt}>{'Payable Amount'}</Text>
        <Text style={styles.txt}>{'\u20B9'} {amount}</Text>
      </View>
      <Image source={Images.line} style={[styles.line, {marginTop: 0}]} />
      <View style={styles.payment}>
        <Text style={[styles.txt, {}]}>
          {'Account Name'}
        </Text>
        <Text style={styles.txt}>{data?.account_name}</Text>
      </View>
      <View style={styles.payment}>
        <Text style={[styles.txt, {}]}>
          {'Account Number'}
        </Text>
        <Text style={styles.txt}>{data?.account_number}</Text>
      </View>
      <View style={styles.payment}>
        <Text style={[styles.txt, {}]}>
          {'IFSC Code'}
        </Text>
        <Text style={styles.txt}>{data?.ifsc}</Text>
      </View>
      <View style={styles.payment}>
        <Text style={[styles.txt, {}]}>
          {'Branch'}
        </Text>
        <Text style={styles.txt}>{data?.branch}</Text>
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
  container: {
    height: adjust(42),
  },
  txtBox: {
    height: '90%',
  },
  date: {
    height: adjust(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'green'
  },
  from: {
    backgroundColor: COLORS.WHITE,
    height: adjust(40),
    // width: Platform.OS === 'ios' ? adjust(125) : adjust(130),
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: adjust(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '45%',
  },
  label: {
    color: COLORS.DARK,
    fontSize: adjust(14),
    fontFamily: FONT_FAMILIES.AMERETTO,
  },
  textbox: {
    // width: adjust(270),
    height: adjust(40),
    fontSize: adjust(12),
    // marginLeft: adjust(25),
    fontFamily: FONT_FAMILIES.AMERETTO,
    borderColor: COLORS.BORDER_COLOR,
    backgroundColor: COLORS.WHITE,
    borderWidth: StyleSheet.hairlineWidth,
  },
  round: {
    backgroundColor: COLORS.WHITE,
    height: adjust(15),
    width: adjust(15),
    borderRadius: 5,
    borderColor: COLORS.BORDER_COLOR,
    borderWidth: 1,
  },
  maritalTxt: {
    fontSize: adjust(11),
    fontFamily: FONT_FAMILIES.REGULAR,
    color: COLORS.DARK,
    paddingLeft: adjust(8),
  },
  maritalBtn: {
    flexDirection: 'row',
    height: adjust(15),
    // width: adjust(140),
    // justifyContent: 'space-around',
    alignItems: 'center',
    // marginLeft: adjust(25),
    marginTop: adjust(15),
  },
});
